import { FileUploadButton } from "@/components/FileUploadButton";
import { useState } from "react";
import { StorageImage } from "@/components/StorageImage";
import { uploadProductImage } from "@/lib/catalog";
export const defaultAppearance = { background: "#f3e4cc", text: "#302b25", accent: "#865283", slides: [] as string[], autoplay: true };
export type Appearance = typeof defaultAppearance;
export function AppearanceEditor({ value, onChange }: { value: Appearance; onChange: (value: Appearance) => void }) {
  const [panel, setPanel] = useState<"theme" | "carousel" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function upload(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files);
    if (value.slides.length + selected.length > 5) { setError("Maksimal 5 foto banner."); return; }
    if (selected.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)) { setError("Gunakan JPG, PNG, atau WebP maksimal 5 MB per foto."); return; }
    setBusy(true); setError("");
    const slides = [...value.slides];
    try { for (const file of selected) slides.push(await uploadProductImage(file)); }
    catch { setError("Sebagian foto gagal diupload. Coba kembali."); }
    finally { onChange({ ...value, slides }); setBusy(false); }
  }
  const move = (index: number, offset: number) => { const slides = [...value.slides]; const target = index + offset; if (target < 0 || target >= slides.length) return; [slides[index], slides[target]] = [slides[target]!, slides[index]!]; onChange({ ...value, slides }); };
  return <div className="mb-4">
    <div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setPanel(panel === "theme" ? null : "theme")} className="rounded-xl border border-slate-700 p-3 text-xs">Atur tema & warna</button><button type="button" onClick={() => setPanel(panel === "carousel" ? null : "carousel")} className="rounded-xl border border-slate-700 p-3 text-xs">Atur carousel</button></div>
    {panel && <div className="mt-3 space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-4"><div className="flex justify-between"><b>{panel === "theme" ? "Tema katalog" : "Foto banner"}</b><button type="button" onClick={() => setPanel(null)}>Tutup</button></div>
      {panel === "theme" ? <>{([['background', 'Warna latar'], ['text', 'Warna teks'], ['accent', 'Warna aksen']] as const).map(([key, label]) => <label key={key} className="flex items-center justify-between text-sm">{label}<input type="color" aria-label={label} value={value[key]} onChange={event => onChange({ ...value, [key]: event.target.value })} /></label>)}<button type="button" className="text-xs text-blue-300" onClick={() => onChange({ ...value, background: defaultAppearance.background, text: defaultAppearance.text, accent: defaultAppearance.accent })}>Kembalikan warna awal</button></> : <>
        <label className="block text-xs">Upload maksimal 5 foto (JPG/PNG/WebP, 5 MB)<FileUploadButton disabled={busy} multiple accept="image/jpeg,image/png,image/webp" className="mt-3 block w-full" onChange={event => { void upload(event.target.files); event.target.value = ""; }} /></label>
        {value.slides.map((src, index) => <div key={src} className="flex items-center gap-2"><StorageImage path={src} alt={`Banner ${index + 1}`} className="h-16 w-20 rounded object-cover" /><span className="text-xs">{index + 1}</span><button type="button" disabled={busy || index === 0} onClick={() => move(index, -1)} aria-label="Geser ke atas">↑</button><button type="button" disabled={busy || index === value.slides.length - 1} onClick={() => move(index, 1)} aria-label="Geser ke bawah">↓</button><button type="button" disabled={busy} className="ml-auto text-xs text-rose-300" onClick={() => onChange({ ...value, slides: value.slides.filter((_, i) => i !== index) })}>Hapus</button></div>)}
        {!value.slides.length && <p className="text-xs text-slate-400">Menggunakan foto kebaya bawaan.</p>}<label className="flex gap-2 text-xs"><input type="checkbox" checked={value.autoplay} onChange={event => onChange({ ...value, autoplay: event.target.checked })} />Ganti slide otomatis setiap 5 detik</label>
      </>}{busy && <p className="text-xs">Mengupload...</p>}{error && <p role="alert" className="text-xs text-rose-300">{error}</p>}<p className="text-xs text-slate-400">Preview berubah langsung. Klik Simpan pengaturan untuk menerbitkan.</p></div>}
  </div>;
}