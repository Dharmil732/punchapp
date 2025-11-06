
const DB = 'punchapp-idb'
const STORE = 'queue'
export function openDB(){
  return new Promise((resolve, reject)=>{
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)){
        const os = db.createObjectStore(STORE, { keyPath: 'id' })
        os.createIndex('t', 't')
      }
    }
    req.onsuccess = ()=> resolve(req.result)
    req.onerror = ()=> reject(req.error)
  })
}
export async function put(op){ const db = await openDB(); const tx = db.transaction(STORE,'readwrite'); tx.objectStore(STORE).put(op); return new Promise((res,rej)=>{tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)}) }
export async function all(){ const db = await openDB(); const tx = db.transaction(STORE,'readonly'); const os=tx.objectStore(STORE); return new Promise((res,rej)=>{ const r=os.getAll(); r.onsuccess=()=>res(r.result||[]); r.onerror=()=>rej(r.error) }) }
export async function del(id){ const db = await openDB(); const tx = db.transaction(STORE,'readwrite'); tx.objectStore(STORE).delete(id); return new Promise((res,rej)=>{tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)}) }
export async function clear(){ const db = await openDB(); const tx = db.transaction(STORE,'readwrite'); tx.objectStore(STORE).clear(); return new Promise((res,rej)=>{tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error)}) }
