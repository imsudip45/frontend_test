import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const targetUrl = `${EC2_BACKEND_URL}/api/auth/refresh/`
    
    console.log(`🔧 JWT Refresh POST Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ JWT Refresh POST Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ JWT Refresh POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}
