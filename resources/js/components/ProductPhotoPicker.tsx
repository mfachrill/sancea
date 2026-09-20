import { useEffect, useState } from "react";
import { validateProductImage } from "@/lib/image-validation";

export function ProductPhotoPicker({ files, onChange, disabled }: {
  files: File[]; onChange: (files: File[]) => void; disabled: boolean;
}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    const next = files.map(file => URL.createObjectURL(file));
    setUrls(next);
    return () => next.forEach(url => URL.revokeObjectURL(url));
  }, [files]);
  async function add(selected: File[], index?: number) {
    setError(""); setChecking(true);
    try {
      if (index === undefined && files.length + selected.length > 3) throw new Error("Maksimal 3 foto. Hapus foto dahulu untuk menggantinya.");
      await Promise.all(selected.map(validateProductImage));
      if (index === undefined) onChange([...files, ...selected]);
      else { const next = [...files]; next[index] = selected[0]!; onChange(next); }
    } catch (e) { setError(e instanceof Error ? e.message : "Foto tidak dapat dipilih."); }
    finally { setChecking(false); }
  }
  const locked = disabled || checking;
  return <section className="rounded-2xl border border-slate-800 p-5">
    <div className="flex items-center justify-between gap-3"><div><h3 className="font-bold">Foto produk</h3><p className="mt-1 text-xs text-slate-400">Foto pertama menjadi cover. JPG, PNG, WebP, maksimal 5 MB per foto.</p></div>
      <label className="relative rounded-lg bg-slate-700 px-3 py-2 text-xs font-bold">Upload foto
        <input aria-label="Upload foto produk" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={locked || files.length === 3} className="absolute inset-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed" onChange={e => { const selected = Array.from(e.target.files ?? []); e.target.value = ""; if (selected.length) void add(selected); }} />
      </label>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3">{[0,1,2].map(index => <div key={index}>
      <label className="relative grid aspect-[4/5] cursor-pointer place-items-center overflow-hidden rounded-lg border border-dashed border-slate-700 text-center text-xs text-slate-400">
        {urls[index] ? <img src={urls[index]} alt={index === 0 ? "Cover barang" : "Foto barang " + (index + 1)} className="h-full w-full object-cover" /> : <span>Tambah foto<br />{index + 1}/3</span>}
        <input aria-label={"Pilih foto " + (index + 1)} type="file" accept="image/jpeg,image/png,image/webp" disabled={locked} className="absolute inset-0 w-full cursor-pointer opacity-0" onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) void add([file], Math.min(index, files.length)); }} />
      </label>
      {files[index] && <button type="button" disabled={locked} className="mt-2 text-xs text-rose-400" onClick={() => onChange(files.filter((_, i) => i !== index))}>Hapus foto</button>}
    </div>)}</div>
    {error && <p role="alert" className="mt-3 text-sm text-rose-400">{error}</p>}
  </section>;
}