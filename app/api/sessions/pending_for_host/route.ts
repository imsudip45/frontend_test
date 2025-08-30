import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/pending_for_host/`
    
    console.log(`🔧 Pending For Host GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Pending For Host GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Pending For Host GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to get pending sessions' },
      { status: 500 }
    )
  }
}
