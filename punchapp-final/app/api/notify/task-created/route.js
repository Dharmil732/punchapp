import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/serverAdmin'
export async function POST(req){ const sb=sbAdmin(); const { task_id } = await req.json().catch(()=>({})); if(!task_id) return NextResponse.json({ok:true}); const { data:assignees } = await sb.from('task_assignees').select('user_id, users:user_id(email)').eq('task_id',task_id); const targets=(assignees||[]).map(a=>a.users?.email).filter(Boolean); return NextResponse.json({ok:true,sent:targets.length}) }
