create extension if not exists "pg_cron" with schema "pg_catalog";


  create table "public"."rate_limits" (
    "id" uuid not null default gen_random_uuid(),
    "identifier" text not null,
    "hits" integer default 1,
    "reset_at" timestamp with time zone not null
      );


CREATE INDEX idx_rate_limits_identifier ON public.rate_limits USING btree (identifier);

CREATE UNIQUE INDEX rate_limits_identifier_key ON public.rate_limits USING btree (identifier);

CREATE UNIQUE INDEX rate_limits_pkey ON public.rate_limits USING btree (id);

alter table "public"."rate_limits" add constraint "rate_limits_pkey" PRIMARY KEY using index "rate_limits_pkey";

alter table "public"."rate_limits" add constraint "rate_limits_identifier_key" UNIQUE using index "rate_limits_identifier_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_rate_limit(user_identifier text, max_hits integer, window_seconds integer)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
$function$
;

grant delete on table "public"."rate_limits" to "anon";

grant insert on table "public"."rate_limits" to "anon";

grant references on table "public"."rate_limits" to "anon";

grant select on table "public"."rate_limits" to "anon";

grant trigger on table "public"."rate_limits" to "anon";

grant truncate on table "public"."rate_limits" to "anon";

grant update on table "public"."rate_limits" to "anon";

grant delete on table "public"."rate_limits" to "authenticated";

grant insert on table "public"."rate_limits" to "authenticated";

grant references on table "public"."rate_limits" to "authenticated";

grant select on table "public"."rate_limits" to "authenticated";

grant trigger on table "public"."rate_limits" to "authenticated";

grant truncate on table "public"."rate_limits" to "authenticated";

grant update on table "public"."rate_limits" to "authenticated";

grant delete on table "public"."rate_limits" to "service_role";

grant insert on table "public"."rate_limits" to "service_role";

grant references on table "public"."rate_limits" to "service_role";

grant select on table "public"."rate_limits" to "service_role";

grant trigger on table "public"."rate_limits" to "service_role";

grant truncate on table "public"."rate_limits" to "service_role";

grant update on table "public"."rate_limits" to "service_role";


