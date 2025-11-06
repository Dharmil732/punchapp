
'use client'
import Link from 'next/link'
export default function Home(){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--gap)]">
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/punch" className="btn btn-primary text-center">Punch In</Link>
          <Link href="/punch" className="btn btn-outline text-center">Punch Out</Link>
          <Link href="/break" className="btn btn-primary text-center">Start Break</Link>
          <Link href="/break" className="btn btn-outline text-center">End Break</Link>
        </div>
      </div>
      <div className="card space-y-2">
        <h2 className="text-lg font-semibold">Status</h2>
        <div className="text-sm text-brand-muted">Auto‑out at 23:59, reminders on.</div>
        <div className="flex gap-2">
          <span className="badge">Geo‑fence</span>
          <span className="badge">Offline Queue</span>
          <span className="badge">Tasks</span>
        </div>
      </div>
    </div>
  )
}
