import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get the token from cookies (We assume you set this during login)
  const token = request.cookies.get('accessToken')?.value;
  // You would decode the JWT here to get the role. For MVP, we assume a cookie 'userRole' exists.
  const role = request.cookies.get('userRole')?.value; 

  // 2. Define protected routes
  const isDriverRoute = pathname.startsWith('/driver');
  const isAgentRoute = pathname.startsWith('/agent');
  const isAdminRoute = pathname.startsWith('/admin');

  // 3. Enforce access rules
  if (!token) {
    // If not logged in and trying to access a secure area, redirect to login
    if (isDriverRoute || isAgentRoute || isAdminRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    // If logged in but wrong role, redirect to unauthorized or home
    if (isDriverRoute && role !== 'DRIVER') return NextResponse.redirect(new URL('/', request.url));
    if (isAgentRoute && role !== 'AGENT') return NextResponse.redirect(new URL('/', request.url));
    if (isAdminRoute && !['ADMIN', 'SUPER_ADMIN'].includes(role || '')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If everything is fine, let them proceed
  return NextResponse.next();
}

// Optimize middleware by telling it which paths to run on
export const config = {
  matcher: ['/driver/:path*', '/agent/:path*', '/admin/:path*'],
};