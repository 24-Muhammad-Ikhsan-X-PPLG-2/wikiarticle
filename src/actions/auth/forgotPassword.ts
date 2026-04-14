"use server";

import { getIpUser } from "@/lib/getIpUser";
import { rateLimiter } from "@/lib/redis/rateLimiter";
import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";

export async function ForgotPasswordAuth() {
  const ipUser = await getIpUser();

  const rateLimit = await rateLimiter({
    key: ipUser,
  });
  if (!rateLimit.success)
    return serverActionReturnError(
      `Too many requests. Try again in ${rateLimit.retryAfter}`,
    );

  return serverActionReturn();
}
