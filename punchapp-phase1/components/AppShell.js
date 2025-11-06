
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/punch', label: 'Punch' },
  { href: '/break', label: 'Break' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/shifts', label: 'Shifts' },
  { href: '/admin/reports', label: 'Reports', admin: true },
]

export default function AppShell({ children }){
  const path = usePathname()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="header">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-brand-primary" />
            <div className="font-bold">PunchApp</div>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className={`px-3 py-2 rounded-lg hover:bg-brand-primary/10 ${path===n.href ? 'text-brand-primary font-semibold' : 'text-gray-700'}`}>{n.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-4 space-y-4">{children}</main>
      <footer className="footer">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div>© {new Date().getFullYear()} PunchApp</div>
          <div className="text-xs">Pharmasave theme</div>
        </div>
      </footer>
    </div>
  )
}
