"use client";
import supabase from "@/lib/supabase";

const fetchUserIsLogin = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return true;
  return false;
};
export default fetchUserIsLogin;
