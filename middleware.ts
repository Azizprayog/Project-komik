import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("session")?.value;

  // 🔒 PROTECT ADMIN
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 SUDAH LOGIN TIDAK BOLEH KE LOGIN / REGISTER
  if (
    (pathname === "/login" || pathname === "/register") &&
    session
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
