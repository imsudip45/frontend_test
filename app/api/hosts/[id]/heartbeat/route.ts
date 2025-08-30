import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/hosts/${params.id}/heartbeat/`
    
    console.log(`🔧 Host Heartbeat POST Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Host Heartbeat POST Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Host Heartbeat POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to update heartbeat' },
      { status: 500 }
    )
  }
}
