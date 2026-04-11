import { createClient } from "@supabase/supabase-js";

export const validateCurrentPassword = async (
  email: string,
  password: string,
) => {
  // Buat client sementara tanpa storage
  const tempSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY!,
    {
      auth: {
        persistSession: false, // KUNCI UTAMA: Session nggak bakal tersimpan/menimpa yang lama
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );

  const { error } = await tempSupabase.auth.signInWithPassword({
    email,
    password,
  });

  return !error; // true jika password benar, false jika salah
};
