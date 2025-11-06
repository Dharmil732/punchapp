
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

export function supaAdmin(){
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}
export function dateRangeFor(kind){
  const now = new Date()
  const u = (d)=> new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  let start, end
  if (kind==='weekly'){
    const day = now.getUTCDay(); const s = new Date(now); s.setUTCDate(now.getUTCDate() - day); const e = new Date(s); e.setUTCDate(s.getUTCDate() + 6); start = u(s); end = u(e)
  } else if (kind==='biweekly'){
    const day = now.getUTCDay(); const s = new Date(now); s.setUTCDate(now.getUTCDate() - day); const prev = new Date(s); prev.setUTCDate(s.getUTCDate() - 7); start = u(prev); end = u(s); end.setUTCDate(end.getUTCDate()+6)
  } else {
    const s = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)); const e = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth()+1, 0)); start = s; end = e
  }
  const iso = (d)=> d.toISOString().slice(0,10)
  return { start, end, startStr: iso(start), endStr: iso(end) }
}
export async function fetchFinalPaidMinutes(sb, startStr, endStr){
  const { data, error } = await sb.rpc('report_sum_minutes_paid', { p_start: startStr, p_end: endStr })
  if (error) throw error
  return data
}
export function toCSV(rows){
  const header = ['Employee Name','Email','Employee Code','Minutes Paid','Final Paid Hours']
  const lines = [header.join(',')]
  for (const r of rows){
    const hours = (r.minutes_paid||0)/60
    lines.push([r.name||'', r.email||'', r.employee_code||'', r.minutes_paid||0, hours.toFixed(2)].join(','))
  }
  return lines.join('\n')
}
export function toXLSX(rows, meta){
  const sheet = [['Employee Name','Email','Employee Code','Minutes Paid','Final Paid Hours']]
  for (const r of rows){ sheet.push([r.name||'', r.email||'', r.employee_code||'', r.minutes_paid||0, ((r.minutes_paid||0)/60).toFixed(2)]) }
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(sheet)
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  const fname = `${meta.kind}_${meta.startStr}_${meta.endStr}.xlsx`
  const buf = XLSX.write(wb, { type:'buffer', bookType:'xlsx' })
  return { buf, fname }
}
export async function getAdminManagerRecipients(sb){
  const { data, error } = await sb.from('profiles').select('email').in('role',['admin','manager']).not('email','is',null)
  if (error) throw error
  return (data||[]).map(r=>r.email).filter(Boolean)
}
