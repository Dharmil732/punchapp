'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
const NAV=[{href:'/',label:'Home'},{href:'/tasks',label:'Tasks'},{href:'/shifts',label:'Shifts'},{href:'/admin/reports',label:'Reports',admin:true},{href:'/settings',label:'Settings',admin:true}]
export default function AppShell({ children }){
  const path=usePathname(); const [email,setEmail]=useState(''); const [role,setRole]=useState('')
  useEffect(()=>{ supabase.auth.getUser().then(async ({data})=>{ setEmail(data?.user?.email||''); const id=data?.user?.id; if(!id) return; const { data:p } = await supabase.from('profiles').select('role').eq('id',id).single(); setRole(p?.role||'employee') }); const { data:sub }=supabase.auth.onAuthStateChange((_e,s)=>{ setEmail(s?.user?.email||'') }); return ()=>sub?.subscription?.unsubscribe() },[])
  const allowed=n=>!n.admin||['admin','manager','supervisor'].includes(role)
  return (<div className="min-h-screen flex flex-col"><header className="header"><div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3"><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-xl bg-brand-primary"/><div className="font-bold">PunchApp</div></div><nav className="ml-auto hidden sm:flex items-center gap-1">{NAV.filter(allowed).map(n=>(<Link key={n.href} href={n.href} className={`px-3 py-2 rounded-lg hover:bg-brand-primary/10 ${path===n.href?'text-brand-primary font-semibold':'text-gray-700'}`}>{n.label}</Link>))}</nav><div className="ml-2">{email?(<button className="btn btn-outline" onClick={async()=>{await supabase.auth.signOut(); location.href='/sign-in'}}>Sign out</button>):(<Link href="/sign-in" className="btn btn-primary">Sign in</Link>)}</div></div></header><main className="mx-auto w-full max-w-5xl px-4 py-4 space-y-4">{children}</main><footer className="footer"><div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between"><div>© {new Date().getFullYear()} PunchApp</div><div className="text-xs">Pharmasave theme</div></div></footer></div>)}
