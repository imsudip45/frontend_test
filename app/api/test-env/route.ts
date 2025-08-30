import { NextResponse } from 'next/server'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Environment test',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    ec2BackendUrl: process.env.EC2_BACKEND_URL || 'NOT SET',
    allEnvVars: Object.keys(process.env).filter(key => key.includes('EC2') || key.includes('BACKEND') || key.includes('VERCEL')),
  })
}
