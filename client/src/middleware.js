// middleware.js
import { NextResponse } from 'next/server';


export function middleware(request) {
  const token = request.cookies.get('access_token');

  // List of protected paths (adjust these as needed)
  const protectedPaths = ['/dashboard', '/profile', '/onboarding'];

  // Check if the request pathname starts with any of the protected paths
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // If token is missing, redirect to login page
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// Optionally, use a matcher to limit the middleware to specific routes:
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/onboarding/:path*'],
};
