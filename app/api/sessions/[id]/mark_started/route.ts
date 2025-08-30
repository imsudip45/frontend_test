import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/mark_started/`
    
    console.log(`🔧 Mark Session Started POST Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries())
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ Mark Session Started POST Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Mark Session Started POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to mark session as started' },
      { status: 500 }
    )
  }
}
