"use server";

import { getIpUser } from "@/lib/getIpUser";
import { rateLimiter } from "@/lib/redis/rateLimiter";
import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { loginEmailSchema } from "@/schemas/loginEmailSchema";
import { createClient } from "@/supabase/server";

export async function SendMagicLink(email: string) {
  const parse = loginEmailSchema.safeParse({
    email,
  });
  const ipUser = await getIpUser();
  const rateLimit = await rateLimiter({ key: ipUser });
  if (!rateLimit.success)
    return serverActionReturnError(
      `Too many requests. Try again in ${rateLimit.retryAfter}`,
    );

  if (!parse.success) {
    return serverActionReturnError(parse.error.message);
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (data) {
    try {
      // Send passwordless login link (magic link)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback`,
        },
      });

      if (error) {
        return serverActionReturnError(error.message);
      }

      return serverActionReturn();
    } catch (error: any) {
      return serverActionReturnError(
        error.message || "Failed to send magic link",
      );
    }
  }
  return serverActionReturn();
}
