create or replace function check_rate_limit(
  user_identifier text,
  max_hits int,
  window_seconds int
) 
returns json 
language plpgsql 
security definer 
as $$
declare
  curr_record record;
  seconds_to_wait int;
begin
  select * into curr_record from rate_limits where identifier = user_identifier;

  -- Kasus 1: Belum ada record atau sudah melewati window reset
  if not found or curr_record.reset_at < now() then
    insert into rate_limits (identifier, hits, reset_at)
    values (user_identifier, 1, now() + (window_seconds || ' seconds')::interval)
    on conflict (identifier) 
    do update set hits = 1, reset_at = now() + (window_seconds || ' seconds')::interval;
    
    return json_build_object('allowed', true, 'retry_after', 0);

  -- Kasus 2: Masih dalam window dan di bawah limit
  elsif curr_record.hits < max_hits then
    update rate_limits set hits = hits + 1 where identifier = user_identifier;
    return json_build_object('allowed', true, 'retry_after', 0);

  -- Kasus 3: Limit tercapai
  else
    -- Hitung selisih waktu dalam detik
    seconds_to_wait := ceiling(extract(epoch from (curr_record.reset_at - now())));
    return json_build_object('allowed', false, 'retry_after', seconds_to_wait);
  end if;
end;
$$;