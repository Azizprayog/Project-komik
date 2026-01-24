import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const session = req.cookies.get("session")?.value;
  const admin = req.cookies.get("admin_auth")?.value;

  // 🔍 DEBUG LOG — TARUH DI SINI
  console.log(
    "MIDDLEWARE:",
    pathname,
    "ADMIN:",
    admin
  );

  // 🔒 PROTECT ADMIN PAGES (NOT API)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !admin
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // 🔒 PROTECT ADMIN API
  if (pathname.startsWith("/api/admin") && !admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 👋 Already logged in
  if (
    ["/login", "/register", "/forgot-password"].includes(pathname) &&
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
    "/api/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
