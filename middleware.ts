import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = req.cookies.get("session")?.value;

  // 🔒 Admin protected
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // 👋 Already logged in
  if (
    (pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password") &&
    session
  ) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
