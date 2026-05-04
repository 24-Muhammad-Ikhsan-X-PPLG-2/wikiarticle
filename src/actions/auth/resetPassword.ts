"use server";

import { printLog } from "@/lib/log/printLog";
import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { createClient } from "@/supabase/server";

export async function ResetPasswordAuth(dataForm: FormData) {
  const newPassword = String(dataForm.get("newPassword"));
  const confirmPassword = String(dataForm.get("confirmPassword"));
  if (!newPassword || !confirmPassword)
    return serverActionReturnError(
      "New Password or Confirm Password is not found!",
    );
  if (newPassword !== confirmPassword)
    return serverActionReturnError(
      "Please confirm you're password!",
      "confirmPassword",
    );
  const supabase = await createClient();
  const {
    error,
    data: { user },
  } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) return serverActionReturnError(error.message);
  printLog("User change password detected", {
    email: user?.email,
    username: user?.user_metadata.username,
  });
  return serverActionReturn();
}
