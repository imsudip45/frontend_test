import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Path to the installer file in public directory
    const installerPath = path.join(process.cwd(), 'public', 'downloads', 'labhya-agent-setup.exe')
    
    // Check if file exists
    try {
      await fs.access(installerPath)
    } catch (error) {
      return NextResponse.json(
        { error: 'Installer file not found' },
        { status: 404 }
      )
    }

    // Read the file
    const fileBuffer = await fs.readFile(installerPath)
    
    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set('Content-Type', 'application/octet-stream')
    headers.set('Content-Disposition', 'attachment; filename="labhya-agent-setup.exe"')
    headers.set('Content-Length', fileBuffer.length.toString())
    headers.set('Cache-Control', 'no-cache')
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    })
    
  } catch (error) {
    console.error('Error serving installer:', error)
    return NextResponse.json(
      { error: 'Failed to serve installer file' },
      { status: 500 }
    )
  }
}
