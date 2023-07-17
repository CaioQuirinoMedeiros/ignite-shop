import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('middleware', {
    pathname: request.nextUrl.pathname,
    query: request.nextUrl.searchParams
  })
  if (request.nextUrl.pathname === "/success") {
    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: ['/success'],
}