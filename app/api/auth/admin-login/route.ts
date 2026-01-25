import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 🔥 TEST ACCOUNT
  if (email !== "admin@test.com" || password !== "123") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  res.cookies.set("session", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return res;
}
