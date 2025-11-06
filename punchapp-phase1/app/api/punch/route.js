
import { NextResponse } from 'next/server'
import { serverSupabase } from '@/lib/session'
export async function POST(req){
  const sb = await serverSupabase()
  const body = await req.json().catch(()=>null)
  if (!body) return NextResponse.json({ error: 'bad json' }, { status: 400 })
  const kind = body.kind
  if (!['in','out','break_out','break_in'].includes(kind)) return NextResponse.json({ error: 'bad kind' }, { status: 400 })
  const row = {
    user_id: body.user_id || null,
    store_id: body.store_id || null,
    kind,
    at: body.at || new Date().toISOString(),
    lat: body.coords?.lat ?? null,
    lon: body.coords?.lon ?? null,
    reason: body.note || null,
    client_meta: { idem: body.idem || '' },
    auto_flag: body.geoFlag || null
  }
  const { error } = await sb.from('punches').insert(row)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
