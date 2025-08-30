import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic'

// Your EC2 backend URL - update this with your actual EC2 public IP
const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162:8000'

// Debug environment variables
console.log('[API Proxy] Environment variables:')
console.log('  - EC2_BACKEND_URL:', process.env.EC2_BACKEND_URL)
console.log('  - NODE_ENV:', process.env.NODE_ENV)
console.log('  - Using backend URL:', EC2_BACKEND_URL)

// Add logging to debug environment variables
console.log('EC2_BACKEND_URL:', process.env.EC2_BACKEND_URL)
console.log('NODE_ENV:', process.env.NODE_ENV)

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  console.log('[API Proxy] GET function called')
  console.log('[API Proxy] Request URL:', request.url)
  console.log('[API Proxy] Request method:', request.method)
  return handleRequest(request, params.path, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  console.log('[API Proxy] POST function called')
  console.log('[API Proxy] Request URL:', request.url)
  console.log('[API Proxy] Request method:', request.method)
  return handleRequest(request, params.path, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PUT')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'DELETE')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PATCH')
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    // Construct the target URL
    const path = pathSegments.join('/')
    const targetUrl = `${EC2_BACKEND_URL}/api/${path}`
    
    // Get the search params from the original request
    const searchParams = request.nextUrl.searchParams.toString()
    const fullUrl = searchParams ? `${targetUrl}?${searchParams}` : targetUrl

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Forward authorization header if present
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    // Forward other important headers
    const userAgent = request.headers.get('user-agent')
    if (userAgent) {
      headers['User-Agent'] = userAgent
    }

    // Prepare request body for methods that need it
    let body: string | undefined
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        body = await request.text()
      } catch (error) {
        console.warn('Failed to read request body:', error)
      }
    }

    // Log the request for debugging
    console.log(`[API Proxy] ${method} ${path} -> ${fullUrl}`)
    console.log(`[API Proxy] Request method: ${method}`)
    console.log(`[API Proxy] Request headers:`, Object.fromEntries(request.headers.entries()))
    console.log(`[API Proxy] Request body:`, body)

    // Make the request to EC2 backend
    console.log(`[API Proxy] Making fetch request to: ${fullUrl}`)
    console.log(`[API Proxy] Fetch method: ${method}`)
    console.log(`[API Proxy] Fetch headers:`, headers)
    console.log(`[API Proxy] Fetch body:`, body)
    
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    })
    
    console.log(`[API Proxy] Response status: ${response.status}`)
    console.log(`[API Proxy] Response headers:`, Object.fromEntries(response.headers.entries()))

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

    // Forward important response headers
    const responseHeaders = [
      'content-type',
      'content-length',
      'cache-control',
      'etag',
      'last-modified',
    ]

    responseHeaders.forEach(header => {
      const value = response.headers.get(header)
      if (value) {
        nextResponse.headers.set(header, value)
      }
    })

    // Set CORS headers for Vercel
    nextResponse.headers.set('Access-Control-Allow-Origin', '*')
    nextResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return nextResponse

  } catch (error) {
    console.error('Proxy error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to proxy request to backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          ec2BackendUrl: EC2_BACKEND_URL,
          nodeEnv: process.env.NODE_ENV,
          timestamp: new Date().toISOString()
        }
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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
