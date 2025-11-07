import ActionButtons from "@/components/ActionButtons";
import { getServerSupabase } from "@/lib/authServer";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/signin");

  const [{ data: shifts }, { data: tasks }] = await Promise.all([
    supabase.from("v_my_today_shifts").select("*").limit(1),
    supabase.from("tasks").select("id,title,priority,due_at,status").order("due_at", { ascending: true }).limit(5),
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="bg-card p-4">
        <h2 className="text-lg font-semibold mb-3">Time</h2>
        <ActionButtons onActionCompleted={() => {}} />
      </section>

      <section className="bg-card p-4">
        <h2 className="text-lg font-semibold mb-3">Today&apos;s Shift</h2>
        {(!shifts || shifts.length===0) ? (
          <p className="text-muted">No scheduled shift today.</p>
        ) : (
          <div className="space-y-1 text-sm">
            <div>Start: {shifts[0].start_local ?? "—"}</div>
            <div>End: {shifts[0].end_local ?? "—"}</div>
            <div>Store: {shifts[0].store_name ?? "—"}</div>
          </div>
        )}
      </section>

      <section className="bg-card p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-3">My Tasks</h2>
        {!tasks?.length ? <p className="text-muted">No tasks.</p> : (
          <table>
            <thead><tr><th>Title</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead>
            <tbody>
              {tasks!.map(t => (
                <tr key={t.id}><td>{t.title}</td><td>{t.priority}</td><td>{t.due_at?.slice(0,16).replace("T"," ")}</td><td>{t.status}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
