create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  icon_url text,
  parent_id uuid references categories(id) on delete cascade, -- Untuk sub-kategori
  created_at timestamptz default now()
);

-- Tambahkan RLS agar semua orang bisa baca, tapi cuma admin yang bisa edit
alter table categories enable row level security;

create policy "Categories are viewable by everyone" 
on categories for select using (true);