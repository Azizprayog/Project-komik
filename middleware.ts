import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // hanya proteksi admin
  if (pathname.startsWith("/admin")) {
    // ❗ BIAR LOGIN ADMIN TIDAK KELOOP
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const isAdmin = req.cookies.get("admin_auth")?.value;

    if (!isAdmin) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
