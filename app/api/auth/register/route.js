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
    const username = typeof body?.username === 'string' ? body.username.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: { message: 'Username, email, and password are required.' } },
        { status: 400 }
      )
    }

    const upstreamResponse = await fetch(`${API}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({ username, email, password }),
    })

    const payload = await upstreamResponse.json().catch(() => null)

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { error: { message: 'Registration failed.' } },
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
