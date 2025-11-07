import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (k) => cookieStore.get(k)?.value } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", session.user.id).single();

  if (profile?.role === "admin")      redirect("/admin");
  if (profile?.role === "manager")    redirect("/reports");
  if (profile?.role === "supervisor") redirect("/supervisor");
  redirect("/home");
}
