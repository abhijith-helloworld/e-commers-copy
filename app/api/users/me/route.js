import { NextResponse } from 'next/server'

const API = process.env.STRAPI_API_URL

export async function GET(request) {
  try {
    if (!API) {
      return NextResponse.json(
        { error: { message: 'STRAPI_API_URL is not configured.' } },
        { status: 500 }
      )
    }

    const authorization = request.headers.get('authorization') || ''

    if (!authorization.toLowerCase().startsWith('bearer ')) {
      return NextResponse.json(
        { error: { message: 'Authorization token is required.' } },
        { status: 401 }
      )
    }

    const upstreamResponse = await fetch(`${API}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
      cache: 'no-store',
    })

    const payload = await upstreamResponse.json().catch(() => null)

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { error: { message: 'Unable to fetch user profile.' } },
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
