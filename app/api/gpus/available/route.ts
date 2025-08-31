import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const targetUrl = `${EC2_BACKEND_URL}/api/gpus/available/${queryString ? `?${queryString}` : ''}`
    
    console.log(`🔧 Available GPUs GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Available GPUs GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Available GPUs GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch available GPUs' },
      { status: 500 }
    )
  }
}
