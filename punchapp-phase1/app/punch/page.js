
'use client'
import { useEffect, useState } from 'react'
import { makeIdemKey } from '@/lib/idempotency'
import { haversineMeters, softGate } from '@/lib/geo'
import { enqueue, flushNow, listenForSWFlush } from '@/lib/offlineQueue'

export default function PunchPage(){
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')
  const [coords, setCoords] = useState(null)
  const [store, setStore] = useState(null)

  useEffect(()=>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        pos=>setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        ()=>setCoords(null),
        { enableHighAccuracy: true, timeout: 6000 }
      )
    }
    listenForSWFlush()
  },[])

  async function punch(kind){
    setLoading(true)
    try{
      const idem = makeIdemKey('p')
      let geoFlag = null
      if (coords && store && typeof store.lat==='number' && typeof store.lon==='number'){
        const d = haversineMeters(coords, { lat: store.lat, lon: store.lon })
        const ok = softGate(d, store.radius_m||150, store.grace_m||0)
        if (!ok){
          const c = confirm(`You appear to be ~${Math.round(d)}m from store. Proceed?`)
          if (!c){ setLoading(false); return }
          geoFlag = `geo_outside_${Math.round(d)}m`
        }
      }
      const body = { kind, note, coords, idem, geoFlag }
      const res = await fetch('/api/punch', { method: 'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify(body) })
      if (res.ok){ alert((kind==='in'?'Punched In':'Punched Out') + (geoFlag?` · ${geoFlag}`:'')); setNote(''); return }
      await enqueue({ ...body }); alert('No network. Saved offline; will auto‑flush when online.')
    }catch(e){ await enqueue({ kind, note, coords, idem: makeIdemKey('p') }); alert('Saved offline; will auto‑flush when online.') }
    finally{ setLoading(false); flushNow() }
  }

  return (
    <div className="space-y-4">
      <div className="card space-y-3">
        <h1 className="text-xl font-bold">Punch</h1>
        <textarea className="input" placeholder="Reason (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <button disabled={loading} className="btn btn-primary" onClick={()=>punch('in')}>Punch In</button>
          <button disabled={loading} className="btn btn-primary" onClick={()=>punch('out')}>Punch Out</button>
        </div>
        <div className="text-xs text-gray-500">GPS: {coords?`${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`:'n/a'}</div>
      </div>
    </div>
  )
}
