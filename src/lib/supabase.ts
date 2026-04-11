"use client";

import { createClient } from "@/supabase/client";
import { createClient as createClientSupabase } from "@supabase/supabase-js";

const supabase = createClient();

export const uploadAvatar = async (file: File, email: string) => {
  try {
    const { error, data } = await supabase.storage
      .from("avatars")
      .upload(`public/avatar-${email}.webp`, file, {
        upsert: true,
      });
    if (error) throw new Error(error.message);
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(data.path);
    return {
      error: null,
      publicUrl,
    };
  } catch (e: any) {
    console.error(e);
    return {
      error: e.message,
      publicUrl: null,
    };
  }
};

export default supabase;
