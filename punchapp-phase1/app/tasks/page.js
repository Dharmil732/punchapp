
'use client'
import { useEffect, useState } from 'react'

export default function TasksPage(){
  const [rows, setRows] = useState([])
  useEffect(()=>{
    // Placeholder UI; connect to Supabase in your project
    setRows([
      { id: '1', title: 'Sweep Aisle 3', due: 'Today', status: 'open' },
      { id: '2', title: 'Restock Fridge', due: 'Tomorrow', status: 'open' },
    ])
  },[])
  return (
    <div className="space-y-4">
      <div className="card"><h1 className="text-xl font-bold">My Tasks</h1></div>
      {rows.map(r=> (
        <div key={r.id} className="card space-y-1">
          <div className="font-semibold">{r.title}</div>
          <div className="text-xs text-gray-500">Due: {r.due}</div>
          <button className="btn btn-primary">Mark Done</button>
        </div>
      ))}
    </div>
  )
}
