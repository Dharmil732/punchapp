
import * as XLSX from 'xlsx'
export function toXLSX(name, data, cols){
  const sheet = [cols]; for (const r of data){ sheet.push(cols.map(k=>r[k] ?? '')) }
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheet), 'Data')
  return XLSX.write(wb, { type:'buffer', bookType:'xlsx' })
}
export function toCSV(name, data, cols){
  const lines = [cols.join(',')]
  for (const r of data){
    lines.push(cols.map(k => { const v = r[k] ?? ''; const s = String(v); return s.includes(',') ? `"${s.replace(/"/g,'""')}"` : s }).join(','))
  }
  return lines.join('\n')
}
