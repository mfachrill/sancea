import { useEffect, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const guides = {
  products: {
    name: "Barang",
    steps: [
      { title: "Tambahkan barang ke katalog", text: "Klik Tambah barang, lalu isi nama dan harga sewa. Lengkapi foto, kategori, dan informasi lain yang dibutuhkan. Tombol Simpan barang menjadi hijau setelah data wajib valid." },
      { title: "Atur kategori dan tampilan", text: "Gunakan Kelola kategori untuk menambah, mengedit, atau menghapus kategori. Tombol Tampil atau Aktifkan mengatur apakah barang terlihat di katalog." },
      { title: "Edit, SKU, dan jadwal", text: "Klik Edit untuk mengubah informasi barang. Buka bagian SKU lalu Tambah SKU untuk menambahkan varian. Tombol Jadwal membuka jadwal dengan barang tersebut sebagai filter." },
      { title: "Hapus barang dengan konfirmasi", text: "Ikon tempat sampah membuka konfirmasi. Pilih Ya, hapus untuk melanjutkan atau Tidak untuk membatalkan. Barang yang masih terkait booking tidak dapat dihapus; nonaktifkan jika tidak ingin ditampilkan." },
    ],
  },
  schedule: {
    name: "Jadwal",
    steps: [
      { title: "Catat jadwal sewa", text: "Klik Tambah jadwal. Pada Tanggal sewa, pilih tanggal mulai lalu tanggal kembali. Pilih barang, isi nama dan WhatsApp customer. Tanggal appointment bersifat opsional." },
      { title: "Simpan jadwal", text: "Jika data wajib sudah valid, tombol Simpan jadwal menjadi hijau. Klik sekali dan tunggu proses selesai. Jadwal yang tersimpan muncul dalam daftar dan kalender sesuai filter yang dipilih." },
      { title: "Cari jadwal yang dibutuhkan", text: "Gunakan pencarian customer atau WhatsApp dan filter barang. Hari ini menampilkan sewa pada hari ini, 7 hari mencakup hari ini dan enam hari berikutnya, sedangkan Terlambat menampilkan jadwal lewat tanggal kembali yang belum selesai atau dibatalkan." },
      { title: "Lihat kalender bulanan", text: "Pilih Kalender untuk melihat booking pada rentang tanggalnya. Gunakan panah untuk berpindah bulan, atau pilih List untuk kembali ke daftar. Pilih Semua pada filter waktu untuk melihat seluruh jadwal." },
    ],
  },
  settings: {
    name: "Pengaturan toko",
    steps: [
      { title: "Lengkapi identitas dan kontak", text: "Isi nama toko, alamat, tagline, dan WhatsApp. Isi akun Instagram untuk menampilkan tautannya; kosongkan jika ingin menyembunyikannya." },
      { title: "Pilih font dan logo", text: "Pilih Font nama toko untuk mengubah tulisan pada banner. Klik Pilih foto di bagian logo untuk mengupload PNG, JPG, atau WebP maksimal 5 MB. Hapus logo jika ingin kembali menggunakan nama toko saja." },
      { title: "Sesuaikan warna dan banner", text: "Klik Atur tema & warna untuk mengubah latar, teks, dan aksen. Atur carousel menyediakan upload hingga lima foto banner, pengaturan urutan, hapus foto, serta pergantian slide otomatis." },
      { title: "Cek preview, lalu simpan", text: "Lihat hasil perubahan pada Preview toko. Setelah sesuai, klik Simpan pengaturan agar perubahan diterapkan ke katalog publik. Tombol Lihat katalog membuka halaman yang dilihat customer." },
    ],
  },
};

const seenGuides = new Set<string>();

export function MenuGuide({ menu }: { menu: keyof typeof guides }) {
  const [open, setOpen] = useState(() => {
    if (seenGuides.has(menu)) return false;
    try { return sessionStorage.getItem(`sancea:guide:${menu}`) !== "seen"; }
    catch { return true; }
  });
  useEffect(() => {
    seenGuides.add(menu);
    try { sessionStorage.setItem(`sancea:guide:${menu}`, "seen"); }
    catch { /* In-memory tracking still prevents repeated guides. */ }
  }, [menu]);
  const [step, setStep] = useState(0);
  const guide = guides[menu];
  const current = guide.steps[step]!;
  function close() { setOpen(false); setStep(0); }
  return <>
    <button type="button" onClick={() => { setStep(0); setOpen(true); }} className={`inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 ${menu === "products" || menu === "schedule" ? "fixed bottom-5 right-5 z-40 bg-slate-900 shadow-lg" : "mb-4"}`}><BookOpen size={15} /> Panduan menu</button>
    <Dialog open={open} onOpenChange={value => { if (!value) close(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-slate-700 bg-[#0d1016] text-white sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2 text-sm text-blue-300"><BookOpen size={20} /><span>Panduan {guide.name}</span></div>
          <DialogTitle>{current.title}</DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-7 text-slate-300">{current.text}</DialogDescription>
        </DialogHeader>
        <div aria-live="polite" className="space-y-2"><p className="text-xs text-slate-400">Langkah {step + 1} dari {guide.steps.length}</p><div className="flex gap-1.5" aria-hidden="true">{guide.steps.map((_, index) => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-blue-500" : "bg-slate-700"}`} />)}</div></div>
        <DialogFooter className="gap-2 sm:justify-between">
          <button type="button" onClick={close} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white">Lewati</button>
          <div className="flex justify-end gap-2">{step > 0 && <button type="button" onClick={() => setStep(value => value - 1)} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm"><ChevronLeft size={16} /> Kembali</button>}<button type="button" onClick={() => { if (step === guide.steps.length - 1) close(); else setStep(value => value + 1); }} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500">{step === guide.steps.length - 1 ? "Selesai, mulai gunakan" : "Berikutnya"}<ChevronRight size={16} /></button></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}