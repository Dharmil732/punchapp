
'use client'
export default function ShiftsPage(){
  const demo = []
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-xl font-bold">My Upcoming Shifts</h1></div>
      {demo.length ? demo.map(s=> (<div key={s.id} className="card">Shift</div>)) : <div className="card">No upcoming shifts.</div>}
      <div className="card"><h2 className="text-lg font-semibold">Released Board</h2><p className="text-sm">No released shifts right now.</p></div>
    </div>
  )
}
