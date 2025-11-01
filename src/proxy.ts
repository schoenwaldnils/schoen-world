import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const theme = request.cookies.get('theme')?.value
  const requestHeaders = new Headers(request.headers)

  if (theme) {
    requestHeaders.set('x-theme', theme)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
