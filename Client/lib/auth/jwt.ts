// In a real application, use a proper JWT library
// This is a simplified mock implementation

interface JWTPayload {
  sub: string // user ID
  name: string
  role: string
  iat: number // issued at
  exp: number // expiration
}

export function createToken(userId: string, name: string, role: string): string {
  const payload: JWTPayload = {
    sub: userId,
    name,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  }

  // In a real app, sign this with a secret key
  return btoa(JSON.stringify(payload))
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    // In a real app, verify the signature
    const payload = JSON.parse(atob(token)) as JWTPayload

    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null

  // Try localStorage first (remember me)
  const token = localStorage.getItem("adminAuthToken")
  if (token) return token

  // Then try sessionStorage (session only)
  return sessionStorage.getItem("adminAuthToken")
}

export function clearToken(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("adminAuthToken")
  sessionStorage.removeItem("adminAuthToken")
}
