create table comments (
  id uuid primary key default uuid_generate_v4(),
  article_id int8 references articles(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  parent_id uuid references comments(id) on delete cascade, -- Untuk fitur nested/replies
  content text not null,
  is_edited boolean default false,
  created_at timestamptz default now()
);

-- Aktifkan RLS
alter table comments enable row level security;

-- Kebijakan: Siapa saja bisa melihat komentar
create policy "Comments are viewable by everyone" 
on comments for select using (true);

-- Kebijakan: Hanya user terautentikasi yang bisa kirim komen
create policy "Authenticated users can post comments" 
on comments for insert with check (auth.role() = 'authenticated');

-- Kebijakan: Hanya pemilik komen yang bisa edit/hapus
create policy "Users can modify their own comments" 
on comments for update using (auth.uid() = user_id);

create policy "Users can delete their own comments" 
on comments for delete using (auth.uid() = user_id);