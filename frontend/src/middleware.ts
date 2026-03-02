import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get tokens and roles from cookies (set during the login process)
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect Agent Routes
  if (pathname.startsWith('/agent')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    if (userRole !== 'AGENT') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect Driver Routes
  if (pathname.startsWith('/driver')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    if (userRole !== 'DRIVER') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect Buyer Routes (NEW)
  if (pathname.startsWith('/buyer')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    if (userRole !== 'BUYER') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Specify which paths this middleware applies to
export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/driver/:path*', '/buyer/:path*'],
};