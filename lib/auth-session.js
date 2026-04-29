const AUTH_FLAG_KEY = 'spicezone-auth'
const AUTH_TOKEN_KEY = 'spicezone-auth-token'
const AUTH_USER_KEY = 'spicezone-auth-user'

export const AUTH_CHANGE_EVENT = 'auth-change'

const isClient = () => typeof window !== 'undefined'

const readStorage = (key) => {
  if (!isClient()) return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStorage = (key, value) => {
  if (!isClient()) return
  try {
    localStorage.setItem(key, value)
  } catch {}
}

const removeStorage = (key) => {
  if (!isClient()) return
  try {
    localStorage.removeItem(key)
  } catch {}
}

export function getStoredAuthToken() {
  return readStorage(AUTH_TOKEN_KEY)
}

export function getStoredAuthUser() {
  const raw = readStorage(AUTH_USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function setStoredAuthUser(user) {
  if (user) {
    writeStorage(AUTH_USER_KEY, JSON.stringify(user))
    return
  }

  removeStorage(AUTH_USER_KEY)
}

export function isUserAuthenticated() {
  const token = getStoredAuthToken()
  if (token) return true
  return readStorage(AUTH_FLAG_KEY) === 'true'
}

export function notifyAuthChange() {
  if (!isClient()) return
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function saveAuthSession(payload) {
  if (!isClient()) return

  const token = payload?.jwt
  const user = payload?.user

  if (token) writeStorage(AUTH_TOKEN_KEY, token)
  if (user) writeStorage(AUTH_USER_KEY, JSON.stringify(user))

  writeStorage(AUTH_FLAG_KEY, 'true')
  notifyAuthChange()
}

export function clearAuthSession() {
  removeStorage(AUTH_FLAG_KEY)
  removeStorage(AUTH_TOKEN_KEY)
  setStoredAuthUser(null)
  notifyAuthChange()
}

export function getApiErrorMessage(payload, fallbackMessage) {
  if (!payload || typeof payload !== 'object') return fallbackMessage

  // Strapi v4 shape: { error: { message: "..." } }
  if (typeof payload.error?.message === 'string' && payload.error.message.trim()) {
    return payload.error.message
  }

  if (typeof payload.error === 'string' && payload.error.trim()) {
    return payload.error
  }

  const firstError = payload.error?.details?.errors?.[0]
  if (typeof firstError?.message === 'string' && firstError.message.trim()) {
    return firstError.message
  }

  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message
  }

  return fallbackMessage
}

function createStatusError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

export async function fetchLoggedInUserProfile() {
  const token = getStoredAuthToken()
  if (!token) {
    throw createStatusError('Missing authentication token.', 401)
  }

  const response = await fetch('/api/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw createStatusError(
      getApiErrorMessage(payload, 'Unable to fetch user details.'),
      response.status
    )
  }

  setStoredAuthUser(payload)
  return payload
}

export async function logoutUserFromServer() {
  const token = getStoredAuthToken()
  if (!token) return

  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw createStatusError(
      getApiErrorMessage(payload, 'Unable to log out from server.'),
      response.status
    )
  }
}
