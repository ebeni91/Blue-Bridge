import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // 1. Get the token and role from cookies
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value;

  // 2. Define which paths require protection
  const isProtectedPath = url.pathname.startsWith('/admin') || 
                          url.pathname.startsWith('/agent') || 
                          url.pathname.startsWith('/driver');

  // 3. Not logged in? Redirect to the universal login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Logged in? Enforce Role-Based Access Control
  if (token) {
    // Prevent non-admins from accessing /admin
    if (url.pathname.startsWith('/admin') && !['ADMIN', 'SUPER_ADMIN'].includes(role || '')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Prevent non-agents from accessing /agent
    if (url.pathname.startsWith('/agent') && role !== 'AGENT') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Prevent non-drivers from accessing /driver
    if (url.pathname.startsWith('/driver') && role !== 'DRIVER') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Smart Redirect: If a logged-in user visits the login page, send them to their dashboard
    if (url.pathname === '/login') {
      if (['ADMIN', 'SUPER_ADMIN'].includes(role || '')) return NextResponse.redirect(new URL('/admin', request.url));
      if (role === 'AGENT') return NextResponse.redirect(new URL('/agent', request.url));
      if (role === 'DRIVER') return NextResponse.redirect(new URL('/driver', request.url));
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on these specific paths to keep the app fast
export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/driver/:path*', '/login'],
};