"use server";

import { createClient } from "@/supabase/server";

export async function LogoutAuth() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
