"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getClientSupabase } from "@/lib/authClient";

type Role = "admin" | "manager" | "supervisor" | "employee" | "view";

export default function RoleNav() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = getClientSupabase();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setRole(null); setLoading(false); return; }
      const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      setRole((data?.role ?? "employee") as Role);
      setLoading(false);
    })();
  }, [supabase]);

  if (loading) return null;

  const Item = ({ href, label }: { href: string, label: string }) => {
    const active = pathname === href;
    return (
      <Link className={`px-3 py-2 rounded-xl ${active ? "bg-neutral-800 text-white" : "hover:bg-neutral-800/60"}`} href={href}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="w-full flex items-center gap-2 overflow-x-auto p-2 bg-neutral-900/60 rounded-2xl">
      <Item href="/home" label="Home" />
      <Item href="/tasks" label="Tasks" />
      <Item href="/shifts" label="Shifts" />
      <Item href="/requests" label="Requests" />
      {(role === "manager" || role === "admin" || role === "supervisor") && <Item href="/reports" label="Reports" />}
      {(role === "manager" || role === "admin") && <Item href="/settings" label="Settings" />}
      {(role === "supervisor" || role === "manager" || role === "admin") && <Item href="/supervisor" label="Supervisor" />}
      {role === "admin" && <Item href="/admin" label="Admin" />}
    </nav>
  );
}
