import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const { pathname } = req.nextUrl;

  // belum login → ga boleh masuk admin
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // sudah login → ga boleh balik ke login
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
