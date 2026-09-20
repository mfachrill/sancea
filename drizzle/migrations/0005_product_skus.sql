create table public.product_skus (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  name text not null default 'Varian 1',
  image_url text,
  price numeric(12,2),
  stock integer not null default 1 check (stock >= 0),
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.product_skus to anon;
grant select, insert, update, delete on public.product_skus to authenticated;
grant all on public.product_skus to service_role;
alter table public.product_skus enable row level security;
create policy "Product SKUs are public" on public.product_skus for select to anon, authenticated using (true);
create policy "Admins manage product SKUs" on public.product_skus for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
