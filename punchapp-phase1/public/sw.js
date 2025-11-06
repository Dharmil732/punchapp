
self.addEventListener('install', (e)=>{ self.skipWaiting() })
self.addEventListener('activate', (e)=>{ self.clients.claim() })
self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(self.registration.showNotification(data.title || 'PunchApp', { body: data.body, icon: '/icons/icon-192.png', data: data.link || '/' }))
})
self.addEventListener('notificationclick', (event) => { event.notification.close(); const url = event.notification.data; event.waitUntil(clients.openWindow(url)) })
self.addEventListener('sync', async (event) => { if (event.tag === 'queue-flush'){ event.waitUntil(flushQueue()) } })
async function flushQueue(){ const all = await self.clients.matchAll({ includeUncontrolled: true }); for (const c of all){ c.postMessage({ type: 'FLUSH_QUEUE' }) } }
