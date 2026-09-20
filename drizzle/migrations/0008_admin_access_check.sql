-- Preserve existing administrators; never grant a role during login.
create or replace function public.claim_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select auth.uid() is not null and public.has_role(auth.uid(), 'admin');
$$;
revoke all on function public.claim_admin() from public;
grant execute on function public.claim_admin() to authenticated;