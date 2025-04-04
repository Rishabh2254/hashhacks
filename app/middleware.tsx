import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function for route protection and redirection
export function middleware(request: NextRequest) {
  // Get user token from cookies (if your app sets auth cookies)
  const session = request.cookies.get('session')?.value;
  
  const pathname = request.nextUrl.pathname;
  
  // Public routes that don't need authentication
  const publicRoutes = ['/', '/login', '/register', '/contacts'];
  
  // Routes that require authentication
  const protectedRoutes = ['/dashboard', '/dashboard/patient', '/dashboard/doctor', '/dashboard/admin'];
  
  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // If the route is protected and the user is not authenticated
  if (isProtectedRoute && !session) {
    const url = new URL('/login', request.url);
    // Add the original URL as a query parameter for redirection after login
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // Prevent authenticated users from accessing login/register pages
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // For all other cases, continue with the request
  return NextResponse.next();
}

// Define the routes that this middleware should run on
export const config = {
  matcher: [
    // Match all protected routes
    '/dashboard/:path*',
    // Match authentication related routes
    '/login',
    '/register',
    // Skip all assets and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
