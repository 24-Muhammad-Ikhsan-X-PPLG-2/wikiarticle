import { serverActionReturnError } from "@/lib/serverActionReturn";
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.error(error);
    if (error)
      return NextResponse.redirect(
        new URL("/login?error=invalid_token", req.url),
      );
    return NextResponse.redirect(new URL(next || "/", req.url));
  }
  return NextResponse.redirect(new URL("/?error=token_not_found", req.url));
}
