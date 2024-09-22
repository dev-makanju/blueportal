import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  if (!token) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/product/:path*', 
};
