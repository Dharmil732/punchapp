
import { NextResponse } from 'next/server'
import { serverSupabase } from '@/lib/session'
export async function POST(req){
  const sb = await serverSupabase()
  const { items } = await req.json().catch(()=>({}))
  if (!Array.isArray(items) || !items.length) return NextResponse.json({ ok: true, flushed: 0 })
  const rows = items.map(it => ({
    user_id: it.user_id || null,
    store_id: it.store_id || null,
    kind: it.kind,
    at: it.at || new Date().toISOString(),
    lat: it.coords?.lat ?? null,
    lon: it.coords?.lon ?? null,
    reason: it.note || null,
    client_meta: { idem: it.idem || '', offline: true },
    auto_flag: it.geoFlag || null,
  }))
  const { error } = await sb.from('punches').insert(rows)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true, flushed: rows.length })
}
