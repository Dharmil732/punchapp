import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/authServer";

export default async function Page() {
  const supabase = getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/signin");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
  const allowed = ["admin"];
  if (!profile || !allowed.includes(profile.role)) redirect("/");
  return (<div className="bg-card p-4"><h1 className="text-lg font-semibold mb-2">Admin • System Settings</h1><p>Work in progress</p></div>);
}
