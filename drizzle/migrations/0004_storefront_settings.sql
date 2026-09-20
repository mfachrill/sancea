alter table public.settings
  add column if not exists catalog_slug text not null default 'sancea',
  add column if not exists logo_url text,
  add column if not exists store_address text,
  add column if not exists maps_url text,
  add column if not exists tagline text,
  add column if not exists instagram text,
  add column if not exists tiktok text,
  add column if not exists show_rental_dates boolean not null default true,
  add column if not exists minimum_rental_days integer not null default 3,
  add column if not exists catalog_visible boolean not null default true,
  add column if not exists social_link_style text not null default 'pill',
  add column if not exists store_name_font text not null default 'Playball',
  add column if not exists default_product_order text not null default 'newest';

alter table public.settings
  add constraint settings_minimum_rental_days_check check (minimum_rental_days > 0);
