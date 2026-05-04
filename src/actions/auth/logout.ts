"use server";

import { getUserSupabaseWithoutProfile } from "@/lib/getUserSupabase";
import { printLog } from "@/lib/log/printLog";
import { createClient } from "@/supabase/server";

export async function LogoutAuth() {
  const supabase = await createClient();
  const user = await getUserSupabaseWithoutProfile();
  if (user) {
    printLog("User logout detected", {
      email: user.email,
      username: user.user_metadata.username,
    });
    await supabase.auth.signOut();
  }
}
