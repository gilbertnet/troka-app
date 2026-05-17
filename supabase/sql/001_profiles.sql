create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_are_public_read" on public.profiles;
create policy "profiles_are_public_read"
on public.profiles
for select
to anon, authenticated
using (true);

drop policy if exists "users_can_insert_own_profile" on public.profiles;
create policy "users_can_insert_own_profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users_can_update_own_profile" on public.profiles;
create policy "users_can_update_own_profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
