create table rate_limits (
  id uuid primary key default gen_random_uuid(),
  identifier text not null unique, -- Bisa User ID atau IP
  hits int default 1,
  reset_at timestamptz not null
);

-- Indexing untuk kecepatan pencarian
create index idx_rate_limits_identifier on rate_limits (identifier);