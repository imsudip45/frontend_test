import { NextRequest, NextResponse } from 'next/server'

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/gpus/${params.id}/`
    
    console.log(`🔧 GPU Detail GET Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    console.log(`✅ GPU Detail GET Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ GPU Detail GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GPU details' },
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
    const targetUrl = `${EC2_BACKEND_URL}/api/gpus/${params.id}/`
    
    console.log(`🔧 GPU Detail PUT Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ GPU Detail PUT Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ GPU Detail PUT Error:', error)
    return NextResponse.json(
      { error: 'Failed to update GPU' },
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
    const targetUrl = `${EC2_BACKEND_URL}/api/gpus/${params.id}/`
    
    console.log(`🔧 GPU Detail PATCH Request: ${targetUrl}`)
    console.log(`📦 Request Body:`, body)
    
    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    console.log(`✅ GPU Detail PATCH Response: ${response.status}`)
    
    return NextResponse.json(data, { status: response.status })
    
  } catch (error) {
    console.error('❌ GPU Detail PATCH Error:', error)
    return NextResponse.json(
      { error: 'Failed to update GPU' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUrl = `${EC2_BACKEND_URL}/api/gpus/${params.id}/`
    
    console.log(`🔧 GPU Detail DELETE Request: ${targetUrl}`)
    
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
        'Accept': 'application/json'
      }
    })
    
    console.log(`✅ GPU Detail DELETE Response: ${response.status}`)
    
    return new NextResponse(null, { status: response.status })
    
  } catch (error) {
    console.error('❌ GPU Detail DELETE Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete GPU' },
      { status: 500 }
    )
  }
}
