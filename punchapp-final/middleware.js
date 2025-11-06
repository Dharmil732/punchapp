import { NextResponse } from 'next/server'
const PROTECTED = ['/', '/tasks', '/shifts', '/admin', '/admin/reports', '/admin/tasks', '/admin/shifts', '/settings']
export function middleware(req) {
  const url = req.nextUrl
  if (url.pathname.startsWith('/sign-in')) return NextResponse.next()
  const hasSession = req.cookies.get('sb-access-token') || req.cookies.get('sb-refresh-token')
  if (PROTECTED.some(p => url.pathname === p || url.pathname.startsWith(p + '/'))) {
    if (!hasSession) {
      const dest = new URL('/sign-in', url.origin); dest.searchParams.set('next', url.pathname); return NextResponse.redirect(dest)
    }
  }
  return NextResponse.next()
}
export const config = { matcher: ['/((?!_next|favicon.ico|sw.js|icons).*)'] }
