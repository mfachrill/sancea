# Deploy Sancea ke Cloudflare Pages

Project menyediakan dua build: npm run build untuk Laravel, npm run build:pages untuk Pages.
Pages menjalankan React langsung. Database, autentikasi, dan upload tetap melalui Supabase.
Tidak perlu PHP, Composer, Docker, APP_KEY, atau database baru di Cloudflare.

## 1. Upload perubahan ke repository

Commit/push semua file aplikasi yang diperlukan, termasuk resources/, public/images/,
package-lock.json, index.html, vite.pages.config.ts, package.json dan tsconfig.json.
Jangan commit .env, node_modules, vendor, public/hot, atau dist.
Project terhubung Lovable: jangan force push atau menulis ulang riwayat commit.

## 2. Buat Pages project

Cloudflare Dashboard > Workers & Pages > Create application > Pages > Connect to Git.
Pilih repository dan branch yang berisi versi siap deploy.

- Framework preset: None (perintah build diisi sendiri)
- Build command: npm run build:pages
- Build output directory: dist
- Root directory: default/akar repository
- Environment variable NODE_VERSION: 22.16.0
- Environment variable VITE_SUPABASE_URL: URL project Supabase yang digunakan
- Environment variable VITE_SUPABASE_PUBLISHABLE_KEY: publishable key atau legacy anon key project yang sama

Isi variabel Supabase untuk Production; isi juga Preview jika ingin preview branch.
Nilai VITE_ bersifat publik dalam hasil build: jangan gunakan service_role atau sb_secret_.
Mengubah variabel membutuhkan deploy ulang.
Build sengaja gagal jika variabel kosong atau key privileged terdeteksi.

## 3. Deploy dan periksa

Klik Save and Deploy. Buka alamat *.pages.dev yang diberikan Cloudflare.
Periksa landing, /katalog, /produk/slug-yang-ada, dan /admin.
Refresh langsung setiap alamat tersebut.
Tidak ada 404.html di root dist: Pages memakai fallback SPA bawaan.
React menangani URL yang tidak dikenal.

Tes login admin, upload foto, perubahan barang/SKU/jadwal/pengaturan.
Customer tanpa login hanya boleh mengakses data publik.
RLS Supabase dan role admin tetap menjadi pengaman akses data.
Migrasi SQL yang diperlukan harus sudah diterapkan di project Supabase.
Jangan menjalankan ulang semua migrasi secara membabi buta.

## 4. Sambungkan sancea.id

Tambahkan domain ke Cloudflare. Pertahankan record DNS yang masih dipakai, termasuk email.
Ganti nameserver di penyedia domain ke nameserver yang ditampilkan Cloudflare.
Pada project Pages > Custom domains > Set up a domain, masukkan sancea.id.
Tambahkan www.sancea.id juga jika ingin digunakan.
Ikuti aktivasi DNS dan HTTPS sampai aktif.
Pembelian/perpanjangan domain tetap di penyedia domain sekarang.

Di Supabase Authentication > URL Configuration, sesuaikan Site URL ke https://sancea.id.
Jika memakai reset password atau OAuth, tambahkan URL redirect tepat yang dipakai aplikasi
ke allowlist, termasuk alamat pages.dev saat pengujian.

## Tes lokal build Pages

npm run typecheck
npm run build:pages
npm run preview:pages

Build lokal membaca variabel VITE_ dari .env yang sudah ada.
Folder dist hanya berisi frontend dan aset publik terpilih, bukan PHP atau file hot Laravel.
Pages Free memiliki batas 25 MiB per aset dan 20.000 file; build memeriksanya.

Referensi:
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
## Keamanan sebelum membuka website untuk customer

Perbaikan lokal:
- Parameter draft katalog hanya berlaku dalam iframe /admin pada origin yang sama,
  setelah getUser dan pemeriksaan role admin. Link publik mengabaikannya.
- Upload bersama membatasi JPG/PNG/WebP, 5 MB, dan memeriksa signature awal file.
  Ini validasi format, bukan antivirus; pembatasan server juga diperlukan.
- Headers Pages membatasi embedding ke origin sendiri, menolak MIME sniffing dan object embedding.
- Dependency esbuild milik core-utils dioverride ke versi yang sudah diperbaiki.
- .env.* diabaikan Git (kecuali .env.example). Riwayat Git tidak ditulis ulang.

WAJIB: buka Supabase SQL Editor dan jalankan drizzle/migrations/0009_security_hardening.sql
setelah migrasi sebelumnya. File lokal tidak otomatis mengubah Supabase.
Migrasi tidak menghapus produk, booking, foto, atau role admin yang sudah ada.

Verifikasi di SQL Editor:
- pg_get_functiondef('public.claim_admin()'::regprocedure) harus hanya mengecek role, tanpa INSERT.
- Periksa pg_policies untuk public.products, product_skus, product_images, bookings,
  booking_items dan storage.objects: restrictive guards dari 0009 harus ada.
- Periksa storage.buckets: product-images harus punya file_size_limit 5242880 dan
  allowed_mime_types image/jpeg, image/png, image/webp.
- Pastikan user_roles hanya berisi administrator yang memang diizinkan.
- Supabase Security Advisor tidak melaporkan tabel aplikasi tanpa RLS.

Tes setelah migrasi:
1. Browser incognito: katalog aktif terbaca, /admin meminta login.
2. Customer/non-admin tidak boleh menulis products/SKU/settings atau membaca booking.
3. SKU nonaktif dan metadata foto produk nonaktif tidak boleh terbaca publik.
4. Admin tetap dapat mengelola produk dan booking; preview draft tetap bekerja.
5. Link /katalog?whatsapp_number=621234&store_name=Palsu tidak mengubah data tampil bagi customer.
6. Upload HTML/SVG atau file >5 MB harus ditolak, termasuk lewat API Storage.

Foto katalog tetap aset publik. Guard metadata tidak mencabut URL foto yang pernah dibagikan,
cache browser, ataupun signed URL yang belum kedaluwarsa. Jangan simpan dokumen customer
atau foto rahasia di bucket katalog. File lama tidak dipindai/dihapus oleh migrasi.

Tes lokal: node scripts/test-image-validation.mjs
Audit dependency: npm audit
Audit kode dan dependency tidak menjamin bebas malware. Database live dan perilaku browser
perlu diverifikasi setelah migrasi/deploy; konfigurasi bucket tidak bisa dipastikan dari file lokal.