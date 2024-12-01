import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth'); 

  if (!authCookie && request.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (authCookie && request.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/library/:path*','/analysis', '/collaborate'] , 
};
