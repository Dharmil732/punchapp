import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/serverAdmin'
export async function POST(req){ const sb=sbAdmin(); const { task_id } = await req.json().catch(()=>({})); if(!task_id) return NextResponse.json({ok:true}); const { data: task } = await sb.from('tasks').select('id, created_by, title, profiles:created_by(email)').eq('id',task_id).single(); const target=task?.profiles?.email; return NextResponse.json({ok:true,sent:target?1:0}) }
