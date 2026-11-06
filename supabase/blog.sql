-- OZMO blog: run once in Supabase → SQL Editor (safe to run again).
-- Creates the posts table, the list of people allowed to write, and image storage.

-- 1. Who may write and publish posts (matched on their login email).
create table if not exists public.blog_authors (
  email text primary key,
  name  text
);
alter table public.blog_authors enable row level security;

drop policy if exists "Authors can see their own row" on public.blog_authors;
create policy "Authors can see their own row"
  on public.blog_authors for select to authenticated
  using (email = auth.jwt() ->> 'email');

create or replace function public.is_blog_author()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.blog_authors where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- 2. Posts.
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title        text not null,
  excerpt      text,
  content      text not null default '',
  cover_image  text,
  category     text,
  author_name  text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid default auth.uid()
);
create index if not exists posts_status_published_idx on public.posts (status, published_at desc);

alter table public.posts enable row level security;

drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
  on public.posts for select to anon, authenticated
  using (status = 'published' or public.is_blog_author());

drop policy if exists "Authors can create posts" on public.posts;
create policy "Authors can create posts"
  on public.posts for insert to authenticated
  with check (public.is_blog_author());

drop policy if exists "Authors can edit posts" on public.posts;
create policy "Authors can edit posts"
  on public.posts for update to authenticated
  using (public.is_blog_author()) with check (public.is_blog_author());

drop policy if exists "Authors can delete posts" on public.posts;
create policy "Authors can delete posts"
  on public.posts for delete to authenticated
  using (public.is_blog_author());

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- 3. Image storage for cover photos and images inside posts (publicly viewable).
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Authors upload blog images" on storage.objects;
create policy "Authors upload blog images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images' and public.is_blog_author());

drop policy if exists "Authors update blog images" on storage.objects;
create policy "Authors update blog images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images' and public.is_blog_author());

drop policy if exists "Authors delete blog images" on storage.objects;
create policy "Authors delete blog images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images' and public.is_blog_author());

-- 4. Add the management team (one line per person). They must also have a login:
--    Authentication → Users → Add user → same email + a password, "Auto Confirm User" ticked.
-- insert into public.blog_authors (email, name) values ('name@example.com', 'Full Name') on conflict do nothing;
