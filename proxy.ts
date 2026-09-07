import { NextRequest, NextResponse } from "next/server";
import { parseSetCookie } from "cookie";

import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken) {
    const session = await checkSession();

    if (session) {
      const response = isPublicRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      const setCookie = session.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (!parsed.value) {
            continue;
          }

          const options = {
            expires: parsed.expires,
            path: parsed.path,
            maxAge: parsed.maxAge,
          };

          if (parsed.name === "accessToken") {
            response.cookies.set("accessToken", parsed.value, options);
          }

          if (parsed.name === "refreshToken") {
            response.cookies.set("refreshToken", parsed.value, options);
          }
        }
      }

      return response;
    }
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};