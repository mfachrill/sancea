# Sancea Kebaya & Makeup

Digital showroom menggunakan Laravel 13, React 19, TypeScript, dan Vite.
Laravel melayani request melalui controller dan Blade; TanStack Router menangani
navigasi frontend. Tampilan showroom dan integrasi katalog Supabase dipertahankan.

## Persyaratan

- PHP 8.3+ beserta ekstensi Laravel (terminal lokal menggunakan PHP 8.5)
- Composer
- Node.js 22.12+ dan npm

## Instalasi

    composer install

Salin .env.example ke .env jika belum ada, lalu isi VITE_SUPABASE_URL
dan VITE_SUPABASE_PUBLISHABLE_KEY dari project Supabase yang digunakan.
Gunakan publishable/anon key; jangan gunakan service-role atau secret key di variabel VITE.

    php artisan key:generate
    npm install
    npm run build
    php artisan serve --host=127.0.0.1 --port=8000

Buka http://127.0.0.1:8000.

Untuk pengembangan dengan hot reload, jalankan:

    composer run dev

Perintah ini menjalankan server Laravel dan Vite bersama, termasuk pada Windows.
npm run dev sendiri hanya menjalankan Vite, bukan server aplikasi.

## Struktur

- app/Http/Controllers/: controller Laravel
- app/Models/: model Laravel
- bootstrap/, config/: bootstrap dan konfigurasi Laravel
- routes/web.php: route halaman utama, katalog, dan detail produk
- resources/views/app.blade.php: dokumen HTML dan pemuatan aset Vite
- resources/js/: halaman React, komponen, hooks, dan integrasi Supabase
- resources/css/app.css: Tailwind dan tema showroom
- public/: document root dan aset hasil build
- database/: migration, factory, dan seeder Laravel
- storage/: log, cache, dan session
- tests/: pengujian Laravel
- drizzle/, supabase/: konfigurasi/schema layanan Supabase yang sudah ada

Data katalog dan gambar masih berasal dari Supabase. Belum ada migrasi data
Supabase ke MySQL/SQLite atau implementasi katalog Eloquent. Session dan cache
lokal menggunakan file sehingga showroom tidak memerlukan database Laravel.
Migration bawaan Laravel tersedia jika database lokal diperlukan kemudian.

## Verifikasi

    php artisan test
    npm run typecheck
    npm run build

## XAMPP

Arahkan DocumentRoot/VirtualHost ke C:/xampp/htdocs/sancea/public, bukan root
repository. PHP Apache harus 8.3+; jika PHP XAMPP lebih lama, gunakan PHP CLI
yang sesuai bersama php artisan serve. URL yang direkomendasikan untuk
pengembangan adalah http://127.0.0.1:8000.

## Lovable

Project terhubung dengan Lovable. Jangan force-push atau menulis ulang history
yang sudah dipublikasikan. Runtime sekarang Laravel; preview Lovable yang
mengharapkan TanStack Start memerlukan penyesuaian tersendiri.

## Foto Other Collections

Bagian Other Collections di halaman depan menggunakan foto lokal dari folder
Google Drive Aksesoris Lainnya. Kategori dan subfolder (termasuk cabang OBI)
disimpan di resources/js/data/accessories.json. Foto disimpan di
public/images/collections/accessories/. Galeri dibuka dari kartu Other Collections,
mendukung navigasi subfolder, dan memperbesar foto.

Untuk mengimpor tambahan foto dari folder aksesori yang sama:

    node scripts/import-accessories.mjs
    npm run build

Folder Drive beserta isinya harus dapat dibaca publik saat impor. Pengunjung
website tidak membutuhkan akses Drive karena foto sudah disalin ke website.
Script membaca subfolder secara rekursif, memakai ulang foto yang sudah diunduh,
dan hanya memperbarui manifest setelah semua unduhan berhasil. Nama dan susunan
folder diperbarui setiap impor; perubahan isi file dengan ID yang sama tidak
diunduh ulang otomatis. File lokal lama tidak dihapus otomatis.

Impor ini khusus folder Aksesoris Lainnya, tidak mengubah katalog Supabase.
Ini bukan sinkronisasi otomatis. Jika listing folder berisi 50 item atau lebih,
script berhenti untuk mencegah impor yang terpotong; gunakan Drive API untuk
folder besar tersebut.
