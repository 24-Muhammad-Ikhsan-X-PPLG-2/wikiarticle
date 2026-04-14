"use server";

import { headers } from "next/headers";

export async function getIpUser() {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0];
  }
  if (realIp) {
    return realIp;
  }
  return "unknown";
}
