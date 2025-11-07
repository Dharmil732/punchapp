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
        get: (k) => req.cookies.get(k)?.value,
        set: (k, v, o) => res.cookies.set(k, v, o),
        remove: (k, o) => res.cookies.set(k, "", { ...o, maxAge: 0 }),
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    url.pathname = "/sign-in";
    url.search = `?returnTo=${encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)}`;
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|public).*)"],
};
