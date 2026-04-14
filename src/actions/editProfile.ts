"use server";

import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { validateCurrentPassword } from "@/lib/validatePassword";
import { profileSettingsSchema } from "@/schemas/profileSettingsSchema";
import { createClient } from "@/supabase/server";
import { ProfileDataType, ProfilePasswordType } from "@/types/profileData";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function EditProfile(formData: FormData) {
  try {
    const supabase = await createClient();
    // 1. Dapatkan user session yang valid (Jangan percaya ID dari form)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) redirect("/login");
    // 2. Parsing data
    const rawProfile = JSON.parse(formData.get("profile") as string);
    const rawPassword = JSON.parse(
      formData.get("profilePassword") as string,
    ) as ProfilePasswordType;
    // 3. Update Metadata Profil (Hanya jika ada data)
    const { error: profileError } = await updateProfileMetadata({
      rawData: rawProfile,
      supabase,
      userId: user.id,
    });
    if (profileError) throw new Error(profileError);

    // 4. Update Password (Hanya jika user mengisi field password)
    if (shouldUpdatePassword(rawPassword)) {
      const { error: passwordError } = await changeUserPassword({
        email: user.email!,
        pwdData: rawPassword,
        supabase,
      });
      if (passwordError) throw new Error(passwordError);
    }

    return serverActionReturn();
  } catch (e: any) {
    console.error("[EditProfile Error]:", e.message);
    return serverActionReturnError(e.message);
  }
}

/**
 * Memperbarui metadata user (di table auth.users)
 */
async function updateProfileMetadata({
  supabase,
  rawData,
  userId,
}: {
  supabase: SupabaseClient;
  rawData: ProfileDataType;
  userId: string;
}) {
  const { error: parseError } = profileSettingsSchema.safeParse(rawData);
  if (parseError) return { error: parseError.message };

  // Cleansing data: hapus null/undefined agar tidak menimpa data lama
  const cleanData = Object.fromEntries(
    Object.entries(rawData).filter(([_, v]) => v != null && v !== ""),
  );

  if (Object.keys(cleanData).length === 0) return { error: null };

  const { error: errorAuth } = await supabase.auth.updateUser({
    data: cleanData,
  });
  const { error: errorProfiles } = await supabase
    .from("profiles")
    .update(cleanData)
    .eq("id", userId);
  if (errorAuth) return { error: errorAuth.message || null };
  if (errorProfiles) return { error: errorProfiles.message || null };
  return { error: null };
}

/**
 * Logika perubahan password dengan re-authentication
 */
async function changeUserPassword({
  email,
  pwdData,
  supabase,
}: {
  supabase: SupabaseClient;
  email: string;
  pwdData: ProfilePasswordType;
}) {
  // Keamanan: Validasi kecocokan password baru
  if (pwdData.newPassword !== pwdData.confirmNewPassword) {
    return { error: "New passwords do not match" };
  }

  // Keamanan: Validasi password lama (Re-auth)
  const isValid = await validateCurrentPassword(
    email,
    pwdData.currentPassword!,
  );
  if (!isValid)
    return {
      error: "Unable to update password. Please check your current password!",
    };

  // Eksekusi update
  const { error } = await supabase.auth.updateUser({
    password: pwdData.newPassword,
  });

  return { error: error?.message || null };
}

/**
 * Helper untuk cek apakah user berniat ganti password
 */
function shouldUpdatePassword(pwd: ProfilePasswordType): boolean {
  return !!(pwd.currentPassword?.trim() && pwd.newPassword?.trim());
}
