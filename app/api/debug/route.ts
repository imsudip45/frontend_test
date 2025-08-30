import { NextResponse } from 'next/server'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Debug endpoint working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    backendUrl: process.env.EC2_BACKEND_URL || 'not set',
    headers: {
      'user-agent': 'debug-endpoint',
      'x-debug': 'true'
    }
  })
}
