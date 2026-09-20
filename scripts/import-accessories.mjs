import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import exactly one public Drive folder at a time. Defaults preserve the accessory importer.
const ROOT_ID = process.env.DRIVE_FOLDER_ID ?? "17MltWS_eZYLL-QTWmS6bYruKsKis7J1_";
const COLLECTION_SLUG = process.env.COLLECTION_SLUG ?? "accessories";
const COLLECTION_NAME = process.env.COLLECTION_NAME ?? "Aksesoris Lainnya";
const COLLECTION_FOLDERS = process.env.COLLECTION_FOLDERS
    ? JSON.parse(process.env.COLLECTION_FOLDERS)
    : null;
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDirectory = path.join(project, "public", "images", "collections", COLLECTION_SLUG);
const manifestFile = path.join(project, "resources", "js", "data", COLLECTION_SLUG + ".json");
const FOLDER_MIME = "application/vnd.google-apps.folder";
const seen = new Set();
const images = new Map();

async function request(url, image = false) {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
            if (!response.ok) throw new Error("HTTP " + response.status);
            return image
                ? {
                      mime: (response.headers.get("content-type") ?? "").split(";")[0],
                      content: Buffer.from(await response.arrayBuffer()),
                  }
                : await response.text();
        } catch (error) {
            console.log("Retry " + (attempt + 1) + ": " + new URL(url).hostname);
            if (attempt === 2) throw new Error("Download failed: " + url, { cause: error });
        }
    }
}

function parseListing(html) {
    const match = html.match(/window\['_DRIVE_ivd'\] = '((?:\\.|[^'])*)'/);
    if (!match) throw new Error("Public Drive listing unavailable. Check sharing permissions.");
    const literal = match[1].replace(/\\x([0-9a-f]{2})/gi, "\\u00$1").replace(/\\'/g, "'");
    const decoded = JSON.parse('"' + literal + '"');
    const items = JSON.parse(decoded)[0] ?? [];
    return items.map((entry) => ({ id: entry[0], name: entry[2], mime: entry[3] }));
}

async function readFolder(id, name) {
    if (seen.has(id)) throw new Error("Duplicate folder or cycle: " + id);
    seen.add(id);
    const html = await request("https://drive.google.com/drive/folders/" + id);
    const items = parseListing(html);
    const node = { id, name, folders: [], images: [] };
    for (const item of items) {
        if (item.mime === FOLDER_MIME) node.folders.push(await readFolder(item.id, item.name));
        else if (item.mime.startsWith("image/")) {
            images.set(item.id, item);
            node.images.push({
                id: item.id,
                name: item.name.replace(/\.(jpe?g|png|webp|heic)$/i, ""),
                src: "",
            });
        }
    }
    console.log(
        name + ": " + node.images.length + " photos, " + node.folders.length + " subfolders",
    );
    return node;
}

async function download(item) {
    // Download a web-sized image once. Visitors never depend on Drive URLs or permissions.
    for (const extension of ["webp"]) {
        const filename = item.id + "." + extension;
        try {
            if ((await stat(path.join(assetDirectory, filename))).size > 0) {
                return "/images/collections/" + COLLECTION_SLUG + "/" + filename;
            }
        } catch {}
    }
    const response = await request(
        "https://lh3.googleusercontent.com/d/" + item.id + "=w1000-rw",
        true,
    );
    const mime = response.mime;
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[mime];
    if (!extension) throw new Error("Not an image: " + item.name + " (" + mime + ")");
    const content = response.content;
    if (!content.length) throw new Error("Empty download: " + item.name);
    const filename = item.id + "." + extension;
    await writeFile(path.join(assetDirectory, filename), content);
    return "/images/collections/" + COLLECTION_SLUG + "/" + filename;
}

await mkdir(assetDirectory, { recursive: true });
const previousImages = new Map();
try {
    const previous = JSON.parse(await readFile(manifestFile, "utf8"));
    const collect = (folder) => {
        folder.images.forEach((image) => previousImages.set(image.id, image.src));
        folder.folders.forEach(collect);
    };
    collect(previous);
} catch (error) {
    if (error.code !== "ENOENT") throw error;
}
const root = COLLECTION_FOLDERS
    ? {
          id: ROOT_ID,
          name: COLLECTION_NAME,
          images: [],
          folders: await Promise.all(
              COLLECTION_FOLDERS.map((folder) => readFolder(folder.id, folder.name)),
          ),
      }
    : await readFolder(ROOT_ID, COLLECTION_NAME);
const entries = [...images.values()];
const sources = new Map();
let cursor = 0;
await Promise.all(
    Array.from({ length: 4 }, async () => {
        while (cursor < entries.length) {
            const item = entries[cursor++];
            const previous = previousImages.get(item.id);
            if (
                previous &&
                new RegExp(
                    "^/images/collections/" + COLLECTION_SLUG + "/[\\w-]+\\.(jpg|png|webp)$",
                ).test(previous)
            ) {
                try {
                    const file = await stat(path.join(project, "public", previous));
                    if (file.size > 0) {
                        sources.set(item.id, previous);
                        continue;
                    }
                } catch {}
            }
            sources.set(item.id, await download(item));
            if (sources.size % 20 === 0)
                console.log("Downloaded " + sources.size + "/" + entries.length);
        }
    }),
);
function attachSources(folder) {
    folder.images.forEach((image) => {
        image.src = sources.get(image.id);
    });
    folder.folders.forEach(attachSources);
}
attachSources(root);
await mkdir(path.dirname(manifestFile), { recursive: true });
// Publish the manifest only after every image download has succeeded.
await writeFile(manifestFile, JSON.stringify(root, null, 2) + "\n");
console.log(
    "Imported " +
        entries.length +
        " photos for " +
        COLLECTION_NAME +
        " from " +
        seen.size +
        " folders.",
);
