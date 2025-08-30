# Vercel Deployment Guide for Labhya Compute Frontend

This guide explains how to deploy the Labhya Compute frontend to Vercel with API proxy support to avoid mixed content issues.

## Overview

The frontend uses Vercel API routes to proxy requests to your EC2 backend, solving the mixed content problem when serving HTTPS frontend with HTTP backend.

## Files Created

1. **`app/api/[...path]/route.ts`** - Catch-all API proxy route
2. **`app/api/health/route.ts`** - Health check endpoint
3. **`app/api/debug/route.ts`** - Debug endpoint
4. **`vercel.json`** - Vercel configuration
5. **`.env.production`** - Production environment variables
6. **`.env.local`** - Local development environment variables
7. **Updated `lib/api.ts`** - Uses Vercel API routes in production

## Deployment Steps

### 1. Prepare Your Repository

Make sure your frontend code is in a Git repository (GitHub, GitLab, etc.).

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your Git provider
3. Click "New Project"
4. Import your repository

### 3. Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
EC2_BACKEND_URL=http://65.0.7.162:8000
```

**Important**: Replace `65.0.7.162` with your actual EC2 public IP address.

### 4. Deploy

1. Vercel will automatically detect it's a Next.js project
2. Click "Deploy"
3. Wait for the build to complete

### 5. Test the Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test the health check: `https://your-project.vercel.app/api/health`
3. Test the debug endpoint: `https://your-project.vercel.app/api/debug`
4. Try logging in and using the application

## How It Works

### Development Mode
- Frontend calls `http://localhost:8000/api/*` directly
- No proxy needed

### Production Mode (Vercel)
- Frontend calls `/api/*` (relative URLs)
- Vercel API routes proxy to `http://65.0.7.162:8000/api/*`
- All requests go through HTTPS, avoiding mixed content

## API Proxy Features

The proxy route (`app/api/[...path]/route.ts`) handles:

- ✅ All HTTP methods (GET, POST, PUT, DELETE, PATCH)
- ✅ Query parameters
- ✅ Request bodies
- ✅ Authorization headers
- ✅ CORS headers
- ✅ Error handling
- ✅ Response forwarding

## Troubleshooting

### 1. CORS Errors
- Check that your EC2 backend has CORS configured
- Verify the `EC2_BACKEND_URL` environment variable is correct

### 2. 500 Errors
- Check Vercel function logs in the dashboard
- Verify your EC2 instance is running and accessible
- Test the backend URL directly: `curl http://65.0.7.162:8000/api/health`

### 3. Authentication Issues
- Ensure JWT tokens are being forwarded correctly
- Check that your backend accepts the Authorization header format

### 4. Timeout Issues
- The proxy has a 30-second timeout (configured in `vercel.json`)
- For long-running requests, consider implementing streaming

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: The proxy allows all origins (`*`) - consider restricting this
3. **Rate Limiting**: Consider adding rate limiting to the proxy
4. **SSL**: Ensure your EC2 backend uses HTTPS in production

## Monitoring

- Use Vercel Analytics to monitor API route performance
- Check Vercel function logs for errors
- Monitor your EC2 backend logs

## Custom Domains

To use a custom domain:

1. Add your domain in Vercel project settings
2. Configure DNS records as instructed
3. The API proxy will work with your custom domain

## Example API Calls

After deployment, your frontend will make calls like:

```javascript
// This will be proxied to http://65.0.7.162:8000/api/auth/login/
fetch('/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

## Local Development

For local development:

1. Copy `.env.local` to your local environment
2. Run `npm run dev`
3. The frontend will use `http://localhost:8000/api/*` directly

## Production Checklist

- [ ] EC2 backend is running and accessible
- [ ] Environment variables are set in Vercel
- [ ] Custom domain is configured (if needed)
- [ ] SSL certificates are valid
- [ ] CORS is properly configured on backend
- [ ] Health check endpoint returns 200
- [ ] Authentication flow works end-to-end
