import { NextResponse } from 'next/server'

const API = process.env.STRAPI_API_URL

function parseMaybeJson(rawText) {
  if (!rawText) return null

  try {
    return JSON.parse(rawText)
  } catch {
    return null
  }
}

export async function POST(request) {
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

    const upstreamResponse = await fetch(`${API}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
      },
      cache: 'no-store',
    })

    const rawBody = await upstreamResponse.text()
    const payload = parseMaybeJson(rawBody)

    // Default Strapi installations often do not expose /api/auth/logout.
    // In that case, treat logout as successful on the app side by clearing local session.
    if (upstreamResponse.status === 404) {
      return NextResponse.json(
        { success: true, message: 'Upstream logout route not found. Local session cleared.' },
        { status: 200 }
      )
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        payload ?? { error: { message: 'Logout failed.' } },
        { status: upstreamResponse.status }
      )
    }

    return NextResponse.json(payload ?? { success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: { message: 'Unable to connect to authentication server.' } },
      { status: 500 }
    )
  }
}
