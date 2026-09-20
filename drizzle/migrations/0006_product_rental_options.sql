alter table public.products
  add column if not exists minimum_rental_days integer,
  add column if not exists pinned boolean not null default false,
  add column if not exists has_multiple_skus boolean not null default true,
  add column if not exists rental_worth numeric(12,2),
  add column if not exists deposit numeric(12,2);
