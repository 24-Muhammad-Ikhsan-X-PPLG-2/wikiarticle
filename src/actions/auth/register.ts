"use server";

import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { registerSchema } from "@/schemas/registerSchema";
import { createClient } from "@/supabase/server";

export async function RegisterAuth(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const username = String(formData.get("username"));
  const birthDate = String(formData.get("birthDate"));
  const confirmPassword = String(formData.get("confirmPassword"));
  const terms = Boolean(formData.get("terms"));
  const parse = registerSchema.safeParse({
    email,
    password,
    username,
    birthDate,
    confirmPassword,
    terms,
  });
  if (!parse.success) return serverActionReturnError(parse.error.message);

  const supabase = await createClient();
  const { error: errorAuth } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        email,
        birth_date: birthDate,
      },
    },
  });
  if (errorAuth) return serverActionReturnError(errorAuth.message);
  return serverActionReturn();
}
