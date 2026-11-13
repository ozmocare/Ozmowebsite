-- OZMO website offers (pop-up banner). Run once in Supabase → SQL Editor, after blog.sql.
-- The same people who can write blog posts (public.blog_authors) can manage offers in /admin.

create table if not exists public.offers (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,                       -- e.g. "Flat 30% off annual membership"
  description text,                                -- one or two lines under the title
  badge       text,                                -- small label, e.g. "Diwali offer"
  image       text,                                -- public image URL (uploaded from /admin)
  cta_label   text not null default 'Claim offer', -- button text
  ends_on     date,                                -- last day the offer shows; empty = no end date
  active      boolean not null default true,       -- switch off to hide without deleting
  sort_order  integer not null default 0,          -- lower shows first when several offers run
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.offers enable row level security;

drop policy if exists "Anyone can read live offers" on public.offers;
create policy "Anyone can read live offers"
  on public.offers for select
  using ((active and (ends_on is null or ends_on >= (now() at time zone 'Asia/Kolkata')::date)) or public.is_blog_author());

drop policy if exists "Admins can create offers" on public.offers;
create policy "Admins can create offers"
  on public.offers for insert to authenticated
  with check (public.is_blog_author());

drop policy if exists "Admins can edit offers" on public.offers;
create policy "Admins can edit offers"
  on public.offers for update to authenticated
  using (public.is_blog_author()) with check (public.is_blog_author());

drop policy if exists "Admins can delete offers" on public.offers;
create policy "Admins can delete offers"
  on public.offers for delete to authenticated
  using (public.is_blog_author());

drop trigger if exists offers_touch_updated_at on public.offers;
create trigger offers_touch_updated_at
  before update on public.offers
  for each row execute function public.touch_updated_at();
