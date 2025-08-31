/**
 * Utility functions for API proxy routes
 */

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

/**
 * Constructs a clean URL by removing trailing slashes and avoiding double slashes
 */
export function buildApiUrl(endpoint: string, queryString?: string): string {
  // Remove trailing slashes from base URL only
  const cleanBaseUrl = EC2_BACKEND_URL.replace(/\/+$/, '')
  // Remove leading slashes but preserve trailing slash for Django REST Framework
  const cleanEndpoint = endpoint.replace(/^\/+/, '') // Remove only leading slashes
  
  // Construct the URL with trailing slash for Django REST Framework
  let url = `${cleanBaseUrl}/api/${cleanEndpoint}`
  
  // Ensure trailing slash for Django REST Framework compatibility
  if (!url.endsWith('/')) {
    url += '/'
  }
  
  // Add query string if provided
  if (queryString) {
    url += `?${queryString}`
  }
  
  return url
}

/**
 * Get the EC2 backend URL for debugging
 */
export function getBackendUrl(): string {
  return EC2_BACKEND_URL
}
