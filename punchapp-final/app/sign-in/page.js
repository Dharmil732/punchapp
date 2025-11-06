'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
export default function SignIn(){
  const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const [busy,setBusy]=useState(false)
  const next = typeof window!=='undefined' ? (new URLSearchParams(location.search).get('next')||'/') : '/'
  async function login(e){ e.preventDefault(); setBusy(true); const { error } = await supabase.auth.signInWithPassword({ email, password: pw }); if (error) alert(error.message); else location.href = next; setBusy(false) }
  return (<div className="max-w-md mx-auto card space-y-3"><h1 className="text-xl font-bold">Sign in</h1><form onSubmit={login} className="space-y-3"><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input className="input" type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/><button disabled={busy} className="btn btn-primary w-full">Sign in</button></form></div>)}
