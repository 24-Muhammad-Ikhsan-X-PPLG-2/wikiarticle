create table articles (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references auth.users(id) on delete cascade not null,
  category_id uuid references categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  content text, -- Markdown text
  excerpt text,
  cover_image text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  views_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tambahkan RLS
alter table articles enable row level security;

-- Siapa saja bisa baca artikel yang sudah 'published'
create policy "Published articles are viewable by everyone" 
on articles for select using (status = 'published');

-- Hanya pemilik yang bisa update/delete artikelnya sendiri
create policy "Users can modify their own articles" 
on articles for all using (auth.uid() = author_id);

alter table articles add column fts tsvector 
generated always as (to_tsvector('english', title || ' ' || coalesce(content, ''))) stored;

create index articles_fts_idx on articles using gin(fts);