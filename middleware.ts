import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const admin = req.cookies.get("admin_auth")?.value;

  console.log("🔥 MIDDLEWARE HIT:", pathname);
  console.log("🍪 ADMIN COOKIE:", admin);

  // ========================
  // 🔒 PROTECT ADMIN API
  // ========================
  if (pathname.startsWith("/api/admin")) {
    console.log("🔥 ADMIN API REQUEST");

    if (!admin) {
      console.log("⛔ BLOCKED ADMIN API");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // ========================
  // 🔒 PROTECT ADMIN PAGE
  // ========================
  if (pathname.startsWith("/admin")) {
    if (!admin && pathname !== "/admin-login") {
      console.log("➡️ REDIRECT TO LOGIN");
      return NextResponse.redirect(
        new URL("/admin-login", req.url)
      );
    }
  }

  // ========================
  // 🚫 BLOCK LOGIN PAGE
  // ========================
  if (pathname === "/admin-login" && admin) {
    return NextResponse.redirect(
      new URL("/admin", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/admin-login",
  ],
};
