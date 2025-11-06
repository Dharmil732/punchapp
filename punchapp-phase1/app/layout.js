
import './globals.css'
import AppShell from '@/components/AppShell'

export const metadata = { title: 'PunchApp', description: 'Pharmasave Time & Tasks' }

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator){
            navigator.serviceWorker.register('/sw.js').catch(()=>{})
          }
        ` }} />
      </body>
    </html>
  )
}
