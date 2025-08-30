import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

// Your EC2 backend URL
const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

export async function POST(request: NextRequest) {
  try {
    console.log('[Host Register Route] POST request received')
    console.log('[Host Register Route] Request URL:', request.url)
    console.log('[Host Register Route] Request method:', request.method)
    
    // Read the request body
    const body = await request.text()
    console.log('[Host Register Route] Request body:', body)
    
    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    // Forward authorization header if present
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    
    // Make the request to EC2 backend
    const targetUrl = `${EC2_BACKEND_URL}/api/auth/register/host/`
    console.log('[Host Register Route] Making request to:', targetUrl)
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body,
    })
    
    console.log('[Host Register Route] Response status:', response.status)
    
    // Get response data
    let responseData: any
    const contentType = response.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }
    
    // Create response with proper headers
    const nextResponse = NextResponse.json(responseData, {
      status: response.status,
    })
    
    // Set CORS headers
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return nextResponse
    
  } catch (error) {
    console.error('[Host Register Route] Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process host registration request',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
