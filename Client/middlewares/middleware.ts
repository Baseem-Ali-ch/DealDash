import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mock rate limiting (in a real app, use Redis or similar)
const ipThrottleMap = new Map<string, { count: number; timestamp: number }>()

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Only apply to admin login endpoint
  if (request.nextUrl.pathname === "/admin/login" && request.method === "POST") {
    // Get client IP
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limiting
    const now = Date.now()
    const ipData = ipThrottleMap.get(ip)

    if (ipData) {
      // Reset count after 15 minutes
      if (now - ipData.timestamp > 15 * 60 * 1000) {
        ipThrottleMap.set(ip, { count: 1, timestamp: now })
      } else if (ipData.count > 10) {
        // Too many requests
        return new NextResponse(JSON.stringify({ error: "Too many login attempts. Please try again later." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "900", // 15 minutes
          },
        })
      } else {
        // Increment count
        ipThrottleMap.set(ip, { count: ipData.count + 1, timestamp: ipData.timestamp })
      }
    } else {
      // First attempt
      ipThrottleMap.set(ip, { count: 1, timestamp: now })
    }

    // Add security headers
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:;",
    )
  }

  return response
}

export const config = {
  matcher: ["/admin/login"],
}
