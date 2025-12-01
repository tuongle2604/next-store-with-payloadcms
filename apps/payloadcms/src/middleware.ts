// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { Payload } from 'payload'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname
  const method = req.method

  // IP detection varies by deployment environment
  // const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'

  console.log(`[API] ${method} ${url} `)

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
