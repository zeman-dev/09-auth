import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { parseCookie, parseSetCookie  } from 'cookie';
import { checkSession } from '@/lib/api/serverApi';

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

      const setCookie = headers["set-cookie"];

      if (setCookie !== undefined) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieString of cookieArray) {
          const parsed = parseSetCookie(cookieString);

          if (parsed.value === undefined) {
      continue;
    }

          const options = {
            expires: parsed.expires ? new Date(parsed.expires) : undefined,
            path: parsed.path,
            maxAge: Number(parsed["maxAge"]),
          };

          if ((parsed.name === 'accessToken') !== undefined) {
            cookieStore.set("accessToken", parsed.value, options);
          }

          if ((parsed.name === 'refreshToken') !== undefined) {
            cookieStore.set("refreshToken", parsed.value, options);
          }
        }
      }
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
      return NextResponse.next();
    }
    if(isPublicRoutes){
        return NextResponse.next();
    }
    if(isPrivateRoutes){
        return NextResponse.redirect( new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }
  else{
    if(isPrivateRoutes){
        return NextResponse.next();
    }
    if(isPublicRoutes){
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
    matcher : ['/profile/:path*', '/notes/:path*','/sign-in', '/sign-up']
}