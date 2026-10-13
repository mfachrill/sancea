-- Pilihan warna untuk kategori Kebaya di admin dan katalog produk.
insert into public.categories (name, slug) values
  ('Kebaya Marun', 'kebaya-marun'),
  ('Kebaya Hitam', 'kebaya-hitam'),
  ('Kebaya Biru', 'kebaya-biru'),
  ('Kebaya Hijau', 'kebaya-hijau'),
  ('Kebaya Pink', 'kebaya-pink'),
  ('Kebaya Ungu', 'kebaya-ungu'),
  ('Kebaya Gold', 'kebaya-gold'),
  ('Kebaya Silver', 'kebaya-silver'),
  ('Kebaya Putih', 'kebaya-putih'),
  ('Kebaya Coklat', 'kebaya-coklat')
on conflict (slug) do nothing;
