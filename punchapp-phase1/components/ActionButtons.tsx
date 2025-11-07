"use client";
import { useEffect, useState } from "react";

type State = "idle" | "working" | "break";

type Props = {
  onActionCompleted?: () => void;
};

export default function ActionButtons({ onActionCompleted }: Props) {
  const [state, setState] = useState<State>("idle");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchState() {
    try {
      const res = await fetch("/api/state", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setState((data?.state || "idle") as State);
      }
    } catch {}
  }

  useEffect(() => { fetchState(); }, []);

  async function sendAction(action: "IN" | "OUT" | "BREAK OUT" | "BREAK IN") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, client_ts: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(await res.text());
      if (action === "IN") setState("working");
      if (action === "OUT") setState("idle");
      if (action === "BREAK OUT") setState("break");
      if (action === "BREAK IN") setState("working");
      onActionCompleted?.();
    } catch (e: any) {
      setError(e?.message ?? "Failed");
    } finally {
      setBusy(false);
    }
  }

  const Btn = ({
    label, active, onClick, disabled
  }: { label: string, active: boolean, onClick: () => void, disabled?: boolean }) => (
    <button
      className={`w-full py-4 rounded-2xl border border-white/10 transition
        ${active ? "bg-white text-black" : "bg-neutral-900 hover:bg-neutral-800 text-white"}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Btn label="Punch In"  active={state === "working"} onClick={() => sendAction("IN")} disabled={busy || state !== "idle"} />
        <Btn label="Punch Out" active={state === "idle"}    onClick={() => sendAction("OUT")} disabled={busy || state === "idle"} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Btn label="Break Out" active={state === "break"}   onClick={() => sendAction("BREAK OUT")} disabled={busy || state !== "working"} />
        <Btn label="Break In"  active={state === "working"} onClick={() => sendAction("BREAK IN")}  disabled={busy || state !== "break"} />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
