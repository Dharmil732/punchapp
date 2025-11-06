import { put,all,del } from '@/lib/idb'
function idem(p='op'){return `${p}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
export async function enqueue(op){await put({id:op.idem||idem('q'),...op,t:Date.now()})}
export async function flushNow(){const items=await all();if(!items.length)return{flushed:0};try{const res=await fetch('/api/queue/flush',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items})});const j=await res.json();if(!res.ok)throw new Error(j.error||'flush failed');for(const it of items){await del(it.id)}return{flushed:j.flushed||items.length}}catch(err){return{flushed:0,error:err.message}}}
export function listenForSWFlush(){if(typeof navigator==='undefined'||!navigator.serviceWorker)return;navigator.serviceWorker.addEventListener('message',e=>{if(e.data?.type==='FLUSH_QUEUE')flushNow()})}
