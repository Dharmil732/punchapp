import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/authServer";

export async function GET() {
  const supabase = getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ state: "idle" });
}
