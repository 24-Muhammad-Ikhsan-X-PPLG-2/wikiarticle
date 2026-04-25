import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: req,
  });
  const { pathname } = req.nextUrl;
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/login/email";
  const protectedRoute = ["/profile", "/create-client"];
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (protectedRoute.includes(pathname) && !user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, req.url),
    );
  }
  return supabaseResponse;
}
