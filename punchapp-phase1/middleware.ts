import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

const PROTECTED = ["/","/home","/tasks","/shifts","/requests","/reports","/admin","/manager","/supervisor","/settings"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (!PROTECTED.some(p => url.pathname === p || url.pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => req.cookies.get(key)?.value,
        set: (key, value, options) => res.cookies.set(key, value, options),
        remove: (key, options) => res.cookies.set(key, "", { ...options, maxAge: 0 }),
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    url.pathname = "/signin";
    url.search = `?returnTo=${encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)}`;
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|public).*)"],
};
