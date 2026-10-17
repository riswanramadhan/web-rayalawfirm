-- =============================================================================
-- Raya Law Firm — skema database untuk website & admin dashboard
-- =============================================================================
-- Cara pakai: buka Supabase Dashboard → SQL Editor → tempel seluruh file ini →
-- Run. File ini idempotent (aman dijalankan ulang). Setelah itu jalankan
-- supabase/seed.sql untuk mengisi data pengacara & artikel awal.
--
-- Ringkasan keamanan:
--   * Publik (anon) hanya bisa MEMBACA pengacara aktif & artikel terbit.
--   * Admin = user Supabase Auth yang emailnya ada di admin_allowlist dan
--     sudah terkonfirmasi.
--   * Admin hanya bisa: tambah pengacara, edit pengacara, tambah artikel.
--     Tidak ada policy UPDATE/DELETE artikel dan DELETE pengacara.
--   * MODE HOLD: semua penulisan admin juga mensyaratkan
--     app_settings.admin_writes_enabled = true. Default-nya FALSE (hold).
--     Aktifkan dengan (jalankan di SQL Editor):
--       update public.app_settings set admin_writes_enabled = true;
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Pengaturan aplikasi (saklar hold — singleton)
-- -----------------------------------------------------------------------------
create table if not exists public.app_settings (
  id boolean primary key default true constraint app_settings_singleton check (id),
  admin_writes_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.app_settings (id) values (true) on conflict (id) do nothing;

comment on table public.app_settings is
  'Saklar global. admin_writes_enabled=false berarti mode HOLD: admin tidak bisa menyimpan data sampai developer mengaktifkannya.';

-- -----------------------------------------------------------------------------
-- 2. Daftar email admin
-- -----------------------------------------------------------------------------
create table if not exists public.admin_allowlist (
  email text primary key constraint admin_allowlist_lowercase check (email = lower(email)),
  created_at timestamptz not null default now()
);

insert into public.admin_allowlist (email)
values ('admin@rayalawfirm.com')
on conflict (email) do nothing;

-- -----------------------------------------------------------------------------
-- 3. Fungsi otorisasi
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users u
    join public.admin_allowlist a on a.email = lower(u.email)
    where u.id = auth.uid()
      and u.email_confirmed_at is not null
  );
$$;

create or replace function public.admin_writes_enabled()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select s.admin_writes_enabled from public.app_settings s where s.id),
    false
  );
$$;

create or replace function public.can_admin_write()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.is_admin() and public.admin_writes_enabled();
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.admin_writes_enabled() from public, anon;
revoke all on function public.can_admin_write() from public, anon;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.admin_writes_enabled() to authenticated;
grant execute on function public.can_admin_write() to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 4. Tabel pengacara
-- -----------------------------------------------------------------------------
create table if not exists public.lawyers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    constraint lawyers_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80),
  name text not null constraint lawyers_name_length check (char_length(name) between 2 and 160),
  position text not null default '',
  position_en text,
  specialization text not null default '',
  specialization_en text,
  bio text not null default '',
  bio_en text,
  expertise text[] not null default '{}',
  expertise_en text[] not null default '{}',
  achievements text[] not null default '{}',
  achievements_en text[] not null default '{}',
  handled_cases text[] not null default '{}',
  handled_cases_en text[] not null default '{}',
  education text[] not null default '{}',
  image_url text not null default '',
  linkedin text not null default '',
  instagram text not null default '',
  facebook text not null default '',
  phone text not null default '',
  email text not null default '',
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lawyers_active_order_idx
  on public.lawyers (is_active, sort_order, created_at);

drop trigger if exists lawyers_set_updated_at on public.lawyers;
create trigger lawyers_set_updated_at
  before update on public.lawyers
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 5. Tabel artikel
-- -----------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    constraint articles_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  title text not null constraint articles_title_length check (char_length(title) between 5 and 200),
  title_en text,
  excerpt text not null default '',
  excerpt_en text,
  content text not null constraint articles_content_length check (char_length(content) between 50 and 100000),
  content_en text,
  category text not null default 'Umum',
  category_en text,
  tags text[] not null default '{}',
  tags_en text[] not null default '{}',
  key_points text[] not null default '{}',
  key_points_en text[] not null default '{}',
  faqs jsonb not null default '[]'::jsonb constraint articles_faqs_array check (jsonb_typeof(faqs) = 'array'),
  faqs_en jsonb not null default '[]'::jsonb constraint articles_faqs_en_array check (jsonb_typeof(faqs_en) = 'array'),
  cover_image_url text not null default '',
  cover_image_alt text,
  author_name text not null default 'Tim Redaksi Raya Law Firm',
  author_name_en text,
  author_lawyer_id uuid references public.lawyers (id) on delete set null,
  meta_title text,
  meta_title_en text,
  meta_description text,
  meta_description_en text,
  featured boolean not null default false,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_published_idx
  on public.articles (is_published, published_at desc);
create index if not exists articles_author_idx
  on public.articles (author_lawyer_id);

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 6. Log percobaan simpan saat mode HOLD (agar developer bisa melihat
--    perubahan apa yang ingin dilakukan klien)
-- -----------------------------------------------------------------------------
create table if not exists public.admin_write_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  user_email text,
  action text not null
    constraint admin_write_requests_action check (action in ('lawyer.create', 'lawyer.update', 'article.create')),
  summary text not null default '' constraint admin_write_requests_summary_length check (char_length(summary) <= 300),
  payload jsonb not null default '{}'::jsonb
    constraint admin_write_requests_payload_size check (octet_length(payload::text) <= 300000),
  created_at timestamptz not null default now()
);

create index if not exists admin_write_requests_created_idx
  on public.admin_write_requests (created_at desc);

-- -----------------------------------------------------------------------------
-- 7. Row Level Security
-- -----------------------------------------------------------------------------
alter table public.app_settings enable row level security;
alter table public.admin_allowlist enable row level security;
alter table public.lawyers enable row level security;
alter table public.articles enable row level security;
alter table public.admin_write_requests enable row level security;

-- Hak akses tingkat tabel (defense in depth, RLS tetap berlaku)
revoke all on table public.app_settings from anon, authenticated;
revoke all on table public.admin_allowlist from anon, authenticated;
revoke all on table public.lawyers from anon, authenticated;
revoke all on table public.articles from anon, authenticated;
revoke all on table public.admin_write_requests from anon, authenticated;

grant select on table public.lawyers to anon, authenticated;
grant insert, update on table public.lawyers to authenticated;
grant select on table public.articles to anon, authenticated;
grant insert on table public.articles to authenticated;
grant select, insert on table public.admin_write_requests to authenticated;

-- Pengacara
drop policy if exists "lawyers_public_read" on public.lawyers;
create policy "lawyers_public_read" on public.lawyers
  for select to anon, authenticated
  using (is_active or (select public.is_admin()));

drop policy if exists "lawyers_admin_insert" on public.lawyers;
create policy "lawyers_admin_insert" on public.lawyers
  for insert to authenticated
  with check ((select public.can_admin_write()));

drop policy if exists "lawyers_admin_update" on public.lawyers;
create policy "lawyers_admin_update" on public.lawyers
  for update to authenticated
  using ((select public.can_admin_write()))
  with check ((select public.can_admin_write()));

-- Artikel (tambah saja; tidak ada update/delete sesuai cakupan admin)
drop policy if exists "articles_public_read" on public.articles;
create policy "articles_public_read" on public.articles
  for select to anon, authenticated
  using ((is_published and published_at <= now()) or (select public.is_admin()));

drop policy if exists "articles_admin_insert" on public.articles;
create policy "articles_admin_insert" on public.articles
  for insert to authenticated
  with check ((select public.can_admin_write()));

-- Log hold
drop policy if exists "write_requests_admin_insert" on public.admin_write_requests;
create policy "write_requests_admin_insert" on public.admin_write_requests
  for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.is_admin()));

drop policy if exists "write_requests_admin_read" on public.admin_write_requests;
create policy "write_requests_admin_read" on public.admin_write_requests
  for select to authenticated
  using ((select public.is_admin()));

-- app_settings & admin_allowlist sengaja TANPA policy: hanya bisa diubah dari
-- SQL Editor / service role, tidak dari aplikasi.

-- -----------------------------------------------------------------------------
-- 8. Storage: bucket publik "media" untuk foto pengacara & gambar artikel
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.can_admin_write()));

drop policy if exists "media_admin_read" on storage.objects;
create policy "media_admin_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
