-- Apply after 0008 in the Supabase SQL Editor. Transactional and repeatable.
begin;

-- Never assign an administrator role through a browser-callable RPC.
create or replace function public.claim_admin()
returns boolean language sql security definer set search_path = public
as $$ select auth.uid() is not null and public.has_role(auth.uid(), 'admin'); $$;
revoke all on function public.claim_admin() from public, anon;
grant execute on function public.claim_admin() to authenticated;
revoke insert, update, delete, truncate, references, trigger on public.user_roles from anon, authenticated;

alter table public.products enable row level security;
alter table public.product_skus enable row level security;
alter table public.product_images enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_items enable row level security;
alter table public.user_roles enable row level security;

-- Restrictive guards also constrain any pre-existing permissive policies.
drop policy if exists "Catalog visibility guard" on public.products;
create policy "Catalog visibility guard" on public.products as restrictive
for select to anon, authenticated using (
  public.has_role(auth.uid(), 'admin') or (
    status and exists (select 1 from public.settings where catalog_visible)
  )
);

drop policy if exists "SKU visibility guard" on public.product_skus;
create policy "SKU visibility guard" on public.product_skus as restrictive
for select to anon, authenticated using (
  public.has_role(auth.uid(), 'admin') or (
    status and exists (select 1 from public.products p where p.id = product_id and p.status)
  )
);

drop policy if exists "Product image visibility guard" on public.product_images;
create policy "Product image visibility guard" on public.product_images as restrictive
for select to anon, authenticated using (
  public.has_role(auth.uid(), 'admin') or
  exists (select 1 from public.products p where p.id = product_id and p.status)
);

drop policy if exists "Booking admin guard" on public.bookings;
create policy "Booking admin guard" on public.bookings as restrictive
for all to anon, authenticated using (public.has_role(auth.uid(),'admin'))
with check (public.has_role(auth.uid(),'admin'));
drop policy if exists "Booking item admin guard" on public.booking_items;
create policy "Booking item admin guard" on public.booking_items as restrictive
for all to anon, authenticated using (public.has_role(auth.uid(),'admin'))
with check (public.has_role(auth.uid(),'admin'));

-- Limit new uploads at the storage service, not just in the UI.
update storage.buckets set file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp']
where id = 'product-images';

drop policy if exists "Product upload admin guard" on storage.objects;
create policy "Product upload admin guard" on storage.objects as restrictive
for insert to anon, authenticated
with check (bucket_id <> 'product-images' or public.has_role(auth.uid(),'admin'));
drop policy if exists "Product update admin guard" on storage.objects;
create policy "Product update admin guard" on storage.objects as restrictive
for update to anon, authenticated
using (bucket_id <> 'product-images' or public.has_role(auth.uid(),'admin'))
with check (bucket_id <> 'product-images' or public.has_role(auth.uid(),'admin'));
drop policy if exists "Product delete admin guard" on storage.objects;
create policy "Product delete admin guard" on storage.objects as restrictive
for delete to anon, authenticated
using (bucket_id <> 'product-images' or public.has_role(auth.uid(),'admin'));

commit;