import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { parseCookie } from 'cookie';
import { api } from './app/api/api';

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
const { headers } = await api.get("/auth/session", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const setCookie = headers["set-cookie"];

      if (setCookie !== undefined) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieString of cookieArray) {
          const parsed = parseCookie(cookieString);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken !== undefined) {
            cookieStore.set("accessToken", parsed.accessToken, options);
          }

          if (parsed.refreshToken !== undefined) {
            cookieStore.set("refreshToken", parsed.refreshToken, options);
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
    }
    if(isPublicRoutes){
        return NextResponse.next();
    }
    if(isPrivateRoutes){
        return NextResponse.redirect( new URL("/sign-in", req.url));
    }
  }
  else{
    if(isPrivateRoutes){
        return NextResponse.next();
    }
    if(isPublicRoutes){
        return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
    matcher : ['/profile/:path*', '/notes/:path*','/sign-in', '/sign-up']
}