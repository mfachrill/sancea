export async function validateProductImage(file: File): Promise<string> {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
  };
  const extension = extensions[file.type];
  if (!extension) throw new Error("Foto harus berupa JPG, PNG, atau WebP.");
  if (!file.size || file.size > 5 * 1024 * 1024) throw new Error("Ukuran foto maksimal 5 MB dan tidak boleh kosong.");
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const matches = file.type === "image/jpeg"
    ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    : file.type === "image/png"
      ? [137,80,78,71,13,10,26,10].every((byte, i) => bytes[i] === byte)
      : String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
        String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (!matches) throw new Error("Isi file tidak sesuai format foto.");
  return extension;
}