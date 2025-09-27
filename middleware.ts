import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This middleware runs on the edge and doesn't have access to localStorage
  // We'll use cookies instead for authentication in middleware

  // Get the path
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login"

  // Get the auth cookie
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"

  // If the path is not public and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the path is login and user is authenticated, redirect to dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Specify the paths that should be checked by the middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
