-- Run this once in Supabase → SQL Editor.
-- Stores every submission from the website forms (free trial, franchise enquiry, contact).

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('trial', 'franchise', 'contact')),
  name        text not null,
  phone       text,
  email       text,
  service     text,
  branch      text,
  city        text,
  budget      text,
  message     text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- The website (anon key) may only INSERT. Nobody can read leads with the anon key;
-- view them in the Supabase dashboard (Table Editor) or with the service role.
drop policy if exists "Website can insert leads" on public.leads;
create policy "Website can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
