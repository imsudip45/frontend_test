import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/`
    
    console.log(`🔧 Session Detail GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries())
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ Session Detail GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Session Detail GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session details' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/`
    
    console.log(`🔧 Session Detail PUT Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries())
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ Session Detail PUT Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Session Detail PUT Error:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/`
    
    console.log(`🔧 Session Detail PATCH Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries())
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ Session Detail PATCH Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ Session Detail PATCH Error:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/sessions/${params.id}/`
    
    console.log(`🔧 Session Detail DELETE Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(request.headers.entries())
      }
    })
    
    console.log(`✅ Session Detail DELETE Response: ${response.status}`)
    
    return new NextResponse(null, { status: response.status })
    
  } catch (error) {
    console.error('❌ Session Detail DELETE Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}
