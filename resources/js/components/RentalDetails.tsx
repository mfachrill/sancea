import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ChevronDown, Heart, MessageCircle, Share2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { supabase } from "@/integrations/supabase/client";
import { formatRupiah, type Product, type Settings } from "@/lib/catalog";

export function RentalDetails({ product, category, settings, onImage }: { product: Product; category: string; settings: Settings | null | undefined; onImage: (image: string | null) => void }) {
  const [selectedId, setSelectedId] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [favorite, setFavorite] = useState(() => { try { return localStorage.getItem(`favorite:${product.id}`) === "1"; } catch { return false; } });
  const { data: skus = [], error } = useQuery({ queryKey: ["public-skus", product.id], queryFn: async () => {
    const { data, error } = await supabase.from("product_skus").select("*").eq("product_id", product.id).eq("status", true).order("created_at");
    if (error) throw error; return data;
  } });
  const selected = skus.find(sku => sku.id === selectedId) ?? skus[0];
  const days = product.minimum_rental_days ?? settings?.minimum_rental_days ?? 3;
  const price = selected?.price ?? product.discount_price ?? product.price;
  const dateLabel = dates?.from ? `${format(dates.from, "d MMM yyyy", { locale: id })}${dates.to ? ` – ${format(dates.to, "d MMM yyyy", { locale: id })}` : " · pilih tanggal kembali"}` : "Pilih tanggal sewa";
  const phone = (settings?.whatsapp_number ?? "").replace(/\D/g, "").replace(/^0/, "62");
  const message = `Halo Kak, saya tertarik menyewa ${product.name}${selected ? ` (${selected.name})` : ""}.${dates?.from && dates.to ? ` Tanggal ${dateLabel}.` : ""} Apakah tersedia?`;
  async function share() { try { await navigator.clipboard.writeText(window.location.href); setNotice("Link produk berhasil disalin."); } catch { setNotice("Salin alamat halaman ini untuk membagikan produk."); } }
  function toggleFavorite() { const next = !favorite; setFavorite(next); try { localStorage.setItem(`favorite:${product.id}`, next ? "1" : "0"); } catch { /* Keep selection for this visit. */ } }
  return <div className="rental-details rounded-2xl p-5 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full detail-tint px-3 py-2 text-[10px] font-bold uppercase tracking-wide">Kategori · {category}</span><div className="flex gap-2"><button type="button" onClick={() => setCalendarOpen(value => !value)} className="inline-flex items-center gap-1 rounded-md detail-tint px-2 py-2 text-xs"><CalendarDays size={14} /> Cek tanggal</button><button type="button" onClick={() => void share()} aria-label="Bagikan produk" className="rounded-md border detail-border p-2"><Share2 size={15} /></button><button type="button" aria-label="Simpan favorit" aria-pressed={favorite} onClick={toggleFavorite} className="rounded-md border detail-border p-2"><Heart size={15} fill={favorite ? "currentColor" : "none"} /></button></div></div>
    <h1 className="mt-6 text-3xl leading-tight font-bold sm:text-4xl">{product.name}</h1>
    <p className="mt-6 text-xs font-semibold uppercase tracking-wider">Varian</p><div className="mt-3 flex flex-wrap gap-2">{skus.length ? skus.map(sku => <button type="button" key={sku.id} aria-pressed={selected?.id === sku.id} onClick={() => { setSelectedId(sku.id); onImage(sku.image_url ?? product.main_image); }} className={`rounded-full border detail-border px-3 py-2 text-xs ${selected?.id === sku.id ? "detail-tint" : ""}`}>{sku.name}</button>) : <span className="text-xs">{error ? "Varian belum dapat dimuat" : "Standar"}</span>}</div>
    <div className="mt-6 grid gap-6 border-t detail-border pt-6"><div><p className="text-xs font-semibold uppercase tracking-wider">Deskripsi</p><p className="mt-2 whitespace-pre-line text-sm leading-6">{product.description || "Hubungi admin untuk informasi produk."}</p></div><div><p className="text-xs font-semibold uppercase tracking-wider">Harga sewa</p><p className="mt-2 text-3xl font-bold">{formatRupiah(price)} <span className="text-xs font-normal">/ {days} hari</span></p>{product.discount_price != null && selected?.price == null && <p className="mt-1 text-xs line-through opacity-60">{formatRupiah(product.price)}</p>}<div className="mt-4 space-y-2 text-sm">{product.rental_worth != null && <p>Nilai barang: {formatRupiah(product.rental_worth)}</p>}{product.deposit != null && <p>Deposit: {formatRupiah(product.deposit)}</p>}</div></div></div>
    <section className="mt-7 rounded-lg border detail-border detail-tint p-4"><h2 className="flex items-center gap-2 text-sm font-semibold"><CalendarDays size={15} /> Rencana sewa</h2><p className="mt-2 text-sm">Pilih tanggal untuk dikonsultasikan ke admin.</p><button type="button" aria-expanded={calendarOpen} onClick={() => setCalendarOpen(value => !value)} className="mt-4 flex min-h-11 w-full items-center gap-2 rounded-lg border detail-border px-3 text-left text-sm"><CalendarDays size={16} /><span className="flex-1">{dateLabel}</span><ChevronDown size={15} /></button>{calendarOpen && <div className="mt-3 overflow-x-auto rounded-lg detail-surface"><Calendar locale={id} mode="range" selected={dates} onSelect={setDates} disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }} min={Math.max(0, days - 1)} className="mx-auto bg-transparent" /><div className="flex justify-between p-3 text-xs"><button type="button" onClick={() => setDates(undefined)}>Hapus tanggal</button><button type="button" onClick={() => setCalendarOpen(false)}>Selesai</button></div></div>}<p className="mt-3 text-xs leading-5">Ketersediaan dikonfirmasi melalui WhatsApp. Minimum sewa {days} hari.</p></section>
    {phone ? <a href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg detail-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90"><MessageCircle size={17} /> Chat WhatsApp</a> : <p className="mt-4 text-sm">Kontak WhatsApp toko belum tersedia.</p>}{notice && <p role="status" className="mt-3 text-xs">{notice}</p>}
  </div>;
}