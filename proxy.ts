import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoutes = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoutes = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (accessToken === undefined) {
    if (refreshToken !== undefined) {
      const { headers } = await checkSession();
      if (isPublicRoutes) {
        return NextResponse.redirect(new URL('/profile', req.url), {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
      }
      if (isPrivateRoutes) {
        return NextResponse.next({
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
      }
    }
    if(isPublicRoutes){
        return NextResponse.next();
    }
    if(isPrivateRoutes){
        return NextResponse.redirect( new URL("/sign-in", req.url));
    }
  }
  else{
    if(isPublicRoutes){
        return NextResponse.redirect(new URL("/profile", req.url))
    }
  }
}
