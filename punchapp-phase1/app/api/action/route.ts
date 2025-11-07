import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/authServer";

export async function POST(req: Request) {
  const supabase = getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const action = String(body?.action || "");
  const client_ts = body?.client_ts || new Date().toISOString();

  return NextResponse.json({ ok: true, action, client_ts });
}
