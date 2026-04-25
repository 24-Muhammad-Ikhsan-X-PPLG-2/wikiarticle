"use server";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import { createClient } from "@/supabase/server";
import { User } from "@supabase/supabase-js";

export const getUserSupabase = async (): Promise<{
  user: User | null;
  profile: ProfileDB | null;
}> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let profile: ProfileDB | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    profile = data ?? null;
  }
  return {
    user,
    profile,
  };
};

export const getUserSupabaseWithoutProfile = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
