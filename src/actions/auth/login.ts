"use server";

import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { loginSchema } from "@/schemas/loginSchema";
import { createClient } from "@/supabase/server";

export async function LoginAuth(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const rememberMe = Boolean(formData.get("rememberMe"));
  const parse = loginSchema.safeParse({
    email,
    password,
    rememberMe,
  });
  console.log(rememberMe);
  if (!parse.success) {
    return serverActionReturnError(parse.error.message);
  }
  const supabase = await createClient();
  const { error: errorAuth } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (errorAuth) {
    return serverActionReturnError(errorAuth.message);
  }
  return serverActionReturn();
}
