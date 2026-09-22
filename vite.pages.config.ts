import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, root, "VITE_");
    if (command === "build") {
        for (const key of ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"]) {
            if (!env[key]?.trim()) throw new Error("Isi " + key + " di Environment Variables Cloudflare sebelum build.");
        }
        const key = env["VITE_SUPABASE_PUBLISHABLE_KEY"]!;
        if (key.startsWith("sb_secret_")) throw new Error("Gunakan publishable key Supabase, bukan secret key.");
        if (key.split(".").length === 3) {
            const payload = JSON.parse(Buffer.from(key.split(".")[1]!, "base64url").toString());
            if (payload.role !== "anon") throw new Error("Gunakan anon/publishable key Supabase, bukan key privileged.");
        }
        const url = new URL(env["VITE_SUPABASE_URL"]!);
        if (url.protocol !== "https:") throw new Error("URL Supabase produksi harus menggunakan HTTPS.");
    }
    return {
        root,
        // Never copy public/index.php, hot, storage, or the Laravel build.
        publicDir: false,
        plugins: [
            tanstackRouter({
                target: "react",
                routesDirectory: "./resources/js/routes",
                generatedRouteTree: "./resources/js/routeTree.gen.ts",
                autoCodeSplitting: true,
            }),
            react(),
            tailwindcss(),
            {
                name: "pages-public-assets",
                closeBundle() {
                    for (const name of ["images", "favicon.svg", "favicon.jpeg", "favicon-sancea.png", "robots.txt", "_headers"]) {
                        const source = resolve(root, "public", name);
                        if (existsSync(source)) cpSync(source, resolve(root, "dist", name), { recursive: true });
                    }
                    let count = 0;
                    function checkAssets(directory: string) {
                        for (const item of readdirSync(directory, { withFileTypes: true })) {
                            const path = resolve(directory, item.name);
                            if (item.isDirectory()) checkAssets(path);
                            else {
                                count++;
                                if (statSync(path).size > 25 * 1024 * 1024) throw new Error("Aset melebihi batas Pages 25 MiB: " + item.name);
                            }
                        }
                    }
                    checkAssets(resolve(root, "dist"));
                    if (count > 20000) throw new Error("Jumlah aset melebihi batas Pages Free 20.000 file.");
                },
            },
        ],
        resolve: { alias: { "@": fileURLToPath(new URL("./resources/js", import.meta.url)) } },
        build: { outDir: "dist", emptyOutDir: true },
    };
});
