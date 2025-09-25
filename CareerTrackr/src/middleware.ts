import { NextResponse, NextRequest } from "next/server";
import { getAuthToken } from "./lib/middleware-auth";

export async function middleware(request: NextRequest) {
  const token = await getAuthToken(request);
  const isAuthPage = request.nextUrl.pathname === "/auth";
  const isHomePage = request.nextUrl.pathname === "/";
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && isHomePage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
