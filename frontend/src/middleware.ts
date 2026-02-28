import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';
  
  // 1. Get the token from cookies
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value;

  // 2. Detect which "Front Door" they used
  const isAdminSubdomain = host.startsWith('admin.');
  const isDriverSubdomain = host.startsWith('driver.');
  const isAgentSubdomain = host.startsWith('agent.');

  // 3. AUTHENTICATION REDIRECTS (Not logged in)
  if ((isAdminSubdomain || isDriverSubdomain || isAgentSubdomain) && !token) {
    // If they are on the login page already, don't trap them in a loop!
    if (url.pathname.startsWith('/login')) {
        return NextResponse.next();
    }
    return NextResponse.rewrite(new URL('/login', request.url));
  }

  // 4. ROLE-BASED ACCESS (Logged in)
  if (token) {
    // If on admin subdomain but not an admin, block access
    if (isAdminSubdomain && !['ADMIN', 'SUPER_ADMIN'].includes(role || '')) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    
    // If on driver subdomain but not a driver, block access
    if (isDriverSubdomain && role !== 'DRIVER') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }

    // INTERNAL REWRITING: Map the root of the subdomain to the actual dashboard page
    if (isAdminSubdomain && url.pathname === '/') {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }
    
    if (isDriverSubdomain && url.pathname === '/') {
      return NextResponse.rewrite(new URL('/driver', request.url));
    }
  }

  return NextResponse.next();
}

// Ensure the middleware runs on the homepage ('/') so it catches the subdomain root!
export const config = {
  matcher: ['/', '/admin/:path*', '/driver/:path*', '/agent/:path*', '/login'],
};