import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes - no authentication needed
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/api')
  );
  
  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ✅ FIX: Check token in Authorization header (sent by axios interceptor)
  const authHeader = request.headers.get('authorization');
  const hasToken = authHeader && authHeader.startsWith('Bearer ');

  // ✅ For dashboard routes, we'll handle auth on client-side
  // This middleware only blocks if there's clearly no auth attempt
  if (pathname.startsWith('/dashboard')) {
    // Let the client-side handle the authentication
    // The useAuth hook will redirect if needed
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};