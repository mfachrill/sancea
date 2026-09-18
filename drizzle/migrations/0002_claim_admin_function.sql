create or replace function public.claim_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  has_admin boolean;
begin
  if auth.uid() is null then
    return false;
  end if;
  select exists (select 1 from public.user_roles where role = 'admin') into has_admin;
  if has_admin then
    return public.has_role(auth.uid(), 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin')
  on conflict do nothing;
  return true;
end;
$$;

revoke all on function public.claim_admin() from public;
grant execute on function public.claim_admin() to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, anon;
