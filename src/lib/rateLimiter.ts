"use server";

import { createClient } from "@/supabase/server";

export async function rateLimiter({ key }: { key: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("check_rate_limit", {
    user_identifier: key,
    max_hits: 5,
    window_seconds: 60,
  });
  if (error) {
    console.error(error.message);
    return {
      success: false,
    };
  }
  if (!data.allowed)
    return {
      success: false,
      retryAfter: data.retry_after,
    };
  return {
    success: true,
  };
}
