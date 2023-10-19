import { NextResponse } from 'next/server';
export default function middleware(request) {
  const token = request.cookies.get('accessToken');
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/orders', '/orders/:path?'],
};
