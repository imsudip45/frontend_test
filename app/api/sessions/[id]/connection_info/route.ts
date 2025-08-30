import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/connection_info/`
    
    console.log(`🔧 Connection Info GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Connection Info GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Connection Info GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to get connection info' },
      { status: 500 }
    )
  }
}
