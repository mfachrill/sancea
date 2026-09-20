create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_whatsapp text not null,
  start_date date not null,
  end_date date not null,
  status public.booking_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table public.booking_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  price numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.bookings, public.booking_items to authenticated;
grant all on public.bookings, public.booking_items to service_role;
alter table public.bookings enable row level security;
alter table public.booking_items enable row level security;
create policy "Admins manage bookings" on public.bookings for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "Admins manage booking items" on public.booking_items for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
