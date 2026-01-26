import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 🔐 TEST ACCOUNT
  if (email === "admin@test.com" && password === "123") {
    const res = NextResponse.json({ success: true });

    // 🍪 SET COOKIE - INI YANG PENTING!
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      secure: process.env.NODE_ENV === "production",
    });

    // 🍪 OPTIONAL: Session cookie (jaga-jaga kalau butuh)
    res.cookies.set("session", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("✅ ADMIN LOGIN SUCCESS - Cookie set!");

    return res;
  }

  // ❌ INVALID CREDENTIALS
  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}