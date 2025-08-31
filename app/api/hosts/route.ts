import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const targetUrl = `${EC2_BACKEND_URL}/api/hosts/${queryString ? `?${queryString}` : ''}`
    
    console.log(`🔧 Hosts GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Hosts GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Hosts GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hosts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const targetUrl = `${EC2_BACKEND_URL}/api/hosts/`
    
    console.log(`🔧 Hosts POST Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ Hosts POST Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Hosts POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to create host' },
      { status: 500 }
    )
  }
}
