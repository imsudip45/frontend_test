/**
 * Utility functions for API proxy routes
 */

const EC2_BACKEND_URL = process.env.EC2_BACKEND_URL || 'http://65.0.7.162'

/**
 * Constructs a clean URL by removing trailing slashes and avoiding double slashes
 */
export function buildApiUrl(endpoint: string, queryString?: string): string {
  // Remove trailing slashes from both base URL and endpoint
  const cleanBaseUrl = EC2_BACKEND_URL.replace(/\/+$/, '')
  const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes
  
  // Construct the URL
  let url = `${cleanBaseUrl}/api/${cleanEndpoint}`
  
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
