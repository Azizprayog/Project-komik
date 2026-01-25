import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔥 GLOBAL MIDDLEWARE HIT");

  const pathname = req.nextUrl.pathname;

  const session = req.cookies.get("session")?.value;
  const admin = req.cookies.get("admin_auth")?.value;

  console.log("➡️ PATH:", pathname);
  console.log("➡️ ADMIN COOKIE:", admin);

  // =============================
  // 🔒 PROTECT ADMIN API ROUTES
  // =============================
  if (pathname.startsWith("/api/admin")) {
    if (!admin) {
      console.log("⛔ BLOCK API ADMIN");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("✅ API ADMIN OK");
    return NextResponse.next();
  }

  // =============================
  // 🔒 PROTECT ADMIN PAGES
  // =============================
  if (pathname.startsWith("/admin") && !admin) {
    console.log("⛔ REDIRECT ADMIN PAGE");

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // =============================
  // 👋 ALREADY LOGGED IN
  // =============================
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
