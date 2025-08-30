import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'GET proxy test',
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  return NextResponse.json({
    status: 'ok',
    message: 'POST proxy test',
    method: request.method,
    url: request.url,
    body: body,
    timestamp: new Date().toISOString(),
  })
}
