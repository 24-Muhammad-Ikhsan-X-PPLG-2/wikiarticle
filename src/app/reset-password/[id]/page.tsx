import appName from "@/constants/appName";
import ResetPasswordClient from "@/features/reset-password/client";
import { createClient } from "@/supabase/server";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${appName} - Reset Password`,
};

const ResetPassword = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = (await supabase
    .from("forgot_password")
    .select("expires_at, user_id")
    .eq("id", id)
    .maybeSingle()) as PostgrestMaybeSingleResponse<{
    user_id: string;
    expires_at: string;
  }>;
  if (!data) redirect("/?error=session_not_found");
  const isExpired = new Date(data.expires_at).getTime() < Date.now();
  console.log({
    isExpired,
    expires_at: data.expires_at,
  });
  if (isExpired) {
    await supabase.from("forgot_password").delete().eq("id", id);
    redirect("/?error=expired_link");
  }
  return <ResetPasswordClient forgotId={id} />;
};

export default ResetPassword;
