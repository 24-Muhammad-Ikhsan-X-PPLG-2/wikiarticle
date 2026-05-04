"use server";

import { printLog } from "@/lib/log/printLog";
import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { loginSchema } from "@/schemas/loginSchema";
import { createClient } from "@/supabase/server";

export async function LoginAuth(formData: FormData) {
  const rawEmail = String(formData.get("email"));
  const rawPassword = String(formData.get("password"));
  const rawRememberMe = Boolean(formData.get("rememberMe"));
  const { data, error, success } = loginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
    rememberMe: rawRememberMe,
  });
  if (!success) {
    return serverActionReturnError(error.message);
  }
  const supabase = await createClient();
  const {
    error: errorAuth,
    data: { user },
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (errorAuth) {
    return serverActionReturnError(errorAuth.message);
  }
  printLog("User login detected", {
    email: user?.email,
    username: user?.user_metadata.username,
  });
  return serverActionReturn();
}
