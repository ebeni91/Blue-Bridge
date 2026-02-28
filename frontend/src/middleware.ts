// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 1. Get the token from cookies (We assume you set this during login)
//   const token = request.cookies.get('accessToken')?.value;
//   // You would decode the JWT here to get the role. For MVP, we assume a cookie 'userRole' exists.
//   const role = request.cookies.get('userRole')?.value; 

//   // 2. Define protected routes
//   const isDriverRoute = pathname.startsWith('/driver');
//   const isAgentRoute = pathname.startsWith('/agent');
//   const isAdminRoute = pathname.startsWith('/admin');

//   // 3. Enforce access rules
//   if (!token) {
//     // If not logged in and trying to access a secure area, redirect to login
//     if (isDriverRoute || isAgentRoute || isAdminRoute) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   } else {
//     // If logged in but wrong role, redirect to unauthorized or home
//     if (isDriverRoute && role !== 'DRIVER') return NextResponse.redirect(new URL('/', request.url));
//     if (isAgentRoute && role !== 'AGENT') return NextResponse.redirect(new URL('/', request.url));
//     if (isAdminRoute && !['ADMIN', 'SUPER_ADMIN'].includes(role || '')) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   // If everything is fine, let them proceed
//   return NextResponse.next();
// }

// // Optimize middleware by telling it which paths to run on
// export const config = {
//   matcher: ['/driver/:path*', '/agent/:path*', '/admin/:path*'],
// };





import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value;

  // 1. Detect which "Front Door" they used
  const isAdminSubdomain = host.startsWith('admin.');
  const isDriverSubdomain = host.startsWith('driver.');
  const isAgentSubdomain = host.startsWith('agent.');

  // 2. AUTHENTICATION REDIRECTS
  // If they are on a subdomain but not logged in, send them to the login page
  if ((isAdminSubdomain || isDriverSubdomain || isAgentSubdomain) && !token) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }

  // 3. ROLE-BASED ACCESS (The "Hybrid" Guard)
  if (token) {
    // If on admin subdomain but not an admin, block access
    if (isAdminSubdomain && !['ADMIN', 'SUPER_ADMIN'].includes(role || '')) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
    
    // If on driver subdomain but not a driver, block access
    if (isDriverSubdomain && role !== 'DRIVER') {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }

    // INTERNAL REWRITING
    // This allows admin.bluebridge.test/ to show the content of /admin internally
    if (isAdminSubdomain && url.pathname === '/') {
      return NextResponse.rewrite(new URL('/admin', request.url));
    }
    
    if (isDriverSubdomain && url.pathname === '/') {
      return NextResponse.rewrite(new URL('/driver', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/driver/:path*', '/agent/:path*'],
};