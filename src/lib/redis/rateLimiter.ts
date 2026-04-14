import { redis } from "./redis.";

export async function rateLimiter({
  key,
  limit = 3,
  windowSec = 60,
}: {
  key: string;
  limit?: number;
  windowSec?: number;
}) {
  const now = Date.now();
  const windowStart = now - windowSec * 1000;
  const redisKey = `rl:${key}`;
  await redis.zremrangebyscore(redisKey, 0, windowStart);
  const count = await redis.zcard(redisKey);
  if (count >= limit) {
    const oldest = await redis.zrange(redisKey, 0, 0, "WITHSCORES");
    const retryAfter = Math.ceil(
      (windowSec * 1000 - (now - Number(oldest[1]))) / 1000,
    );
    return {
      success: false,
      retryAfter,
    };
  }
  await redis.zadd(redisKey, now, `${now}`);
  await redis.expire(redisKey, windowSec);
  return { success: true };
}
