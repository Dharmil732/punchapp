import { NextResponse } from 'next/server'
export async function GET(){ return NextResponse.json({ ok:true, message:'Daily cron hook hit. Wire DB RPC to finalize.' }) }
