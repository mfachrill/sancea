import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchCategories, slugify } from "@/lib/catalog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

export function CategoryManager({ onCreated }: { onCreated?: (id: string) => void } = {}) {
  const queryClient = useQueryClient();
  const { data: categories = [], isPending, error: loadError } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [target, setTarget] = useState<{ id: string; name: string } | null>(null);
  const cleanName = name.trim().replace(/\s+/g, " ");
  const duplicate = categories.some(category => category.id !== editing && category.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase());
  const valid = Boolean(cleanName && slugify(cleanName)) && !duplicate;
  function refresh() {
    for (const key of ["categories", "admin-products", "public-products"]) void queryClient.invalidateQueries({ queryKey: [key] });
  }
  function reset() { setName(""); setEditing(null); setError(""); }
  async function save() {
    if (!valid || busy) return;
    setBusy(true); setError("");
    try {
      const payload = { name: cleanName, slug: slugify(cleanName) };
      const result = editing
        ? await supabase.from("categories").update(payload).eq("id", editing).select("id")
        : await supabase.from("categories").insert(payload).select("id");
      if (result.error) throw new Error(result.error.code === "23505" ? "Kategori dengan nama serupa sudah ada." : result.error.message);
      if (!result.data?.length) throw new Error("Kategori tidak tersimpan. Periksa akses admin Anda.");
      if (!editing && onCreated) {
        const created = { id: result.data[0]!.id, name: cleanName, slug: payload.slug };
        queryClient.setQueryData<typeof categories>(["categories"], current => [...(current ?? []), created]);
        onCreated(created.id);
        setOpen(false);
      }
      reset(); refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "Kategori gagal disimpan."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!target || busy) return;
    setBusy(true); setError("");
    try {
      const { data, error } = await supabase.from("categories").delete().eq("id", target.id).select("id");
      if (error) throw new Error(error.message);
      if (!data?.length) throw new Error("Kategori tidak terhapus. Periksa akses admin Anda.");
      if (editing === target.id) reset();
      setTarget(null); refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "Kategori gagal dihapus."); }
    finally { setBusy(false); }
  }
  return <>
    <button type="button" onClick={() => { reset(); setOpen(true); }} className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold"><Tags size={16} /> Kelola kategori</button>
    <Dialog open={open} onOpenChange={value => { if (!busy) setOpen(value); }}><DialogContent className="max-h-[90dvh] overflow-y-auto rounded-xl border-slate-700 bg-[#0d1016] text-white"><DialogHeader><DialogTitle>Kelola kategori</DialogTitle><DialogDescription className="text-slate-400">Tambah dan atur kategori barang untuk katalog.</DialogDescription></DialogHeader>
      <form onSubmit={event => { event.preventDefault(); event.stopPropagation(); void save(); }} className="space-y-3 border-b border-slate-700 pb-5">
        <label className="block text-sm">{editing ? "Edit nama kategori" : "Nama kategori baru"}<input autoFocus required maxLength={100} disabled={busy} value={name} onChange={event => setName(event.target.value)} placeholder="Contoh: Kebaya, Kamen, Aksesoris" className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm" /></label>
        {duplicate && <p className="text-xs text-amber-300">Nama kategori sudah digunakan.</p>}
        <div className="flex gap-2"><button disabled={!valid || busy} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:bg-slate-700 disabled:text-slate-400"><Plus size={15} />{busy ? "Memproses..." : editing ? "Simpan perubahan" : "Tambah kategori"}</button>{editing && <button disabled={busy} type="button" onClick={reset} className="px-3 text-sm">Batal edit</button>}</div>
      </form>
      {!target && error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
      {loadError && <p role="alert" className="text-sm text-rose-300">Kategori gagal dimuat: {loadError.message}</p>}
      {isPending ? <p>Memuat kategori...</p> : !categories.length && <p className="text-sm text-slate-400">Belum ada kategori.</p>}
      <div className="divide-y divide-slate-800">{categories.map(category => <div key={category.id} className="flex items-center gap-3 py-3"><span className="min-w-0 flex-1 break-words text-sm">{category.name}</span><button disabled={busy} type="button" onClick={() => { setEditing(category.id); setName(category.name); setError(""); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-xs"><Pencil size={14} /> Edit</button><button disabled={busy} type="button" aria-label={`Hapus ${category.name}`} onClick={() => { setError(""); setTarget(category); }} className="rounded-lg border border-rose-500/30 p-2 text-rose-400"><Trash2 size={15} /></button></div>)}</div>
    </DialogContent></Dialog>
    <AlertDialog open={Boolean(target)} onOpenChange={value => { if (!value && !busy) setTarget(null); }}><AlertDialogContent className="rounded-xl border-slate-700 bg-[#0d1016] text-white"><AlertDialogTitle>Hapus kategori {target?.name}?</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Barangnya tetap tersimpan, tetapi tidak lagi memiliki kategori ini.</AlertDialogDescription>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<AlertDialogFooter><AlertDialogCancel disabled={busy} className="bg-slate-800 text-white">Tidak</AlertDialogCancel><AlertDialogAction disabled={busy} onClick={event => { event.preventDefault(); void remove(); }} className="bg-rose-600 text-white hover:bg-rose-500">{busy ? "Menghapus..." : "Ya, hapus"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>;
}