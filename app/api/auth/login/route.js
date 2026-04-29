import { NextResponse } from 'next/server'

const API = process.env.STRAPI_API_URL

export async function POST(request) {
  try {
    if (!API) {
      return NextResponse.json(
        { error: { message: 'STRAPI_API_URL is not configured.' } },
        { status: 500 }
      )
    }

    const body = await request.json()
    const identifier = typeof body?.identifier === 'string' ? body.identifier.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!identifier || !password) {
      return NextResponse.json(
        { error: { message: 'Email/username and password are required.' } },
        { status: 400 }
      )
    }

    const upstreamResponse = await fetch(`${API}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({ identifier, password }),
    })

    const payload = await upstreamResponse.json().catch(() => null)

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { error: { message: 'Login failed.' } },
        { status: upstreamResponse.status }
      )
    }

    return NextResponse.json(payload, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: { message: 'Unable to connect to authentication server.' } },
      { status: 500 }
    )
  }
}
