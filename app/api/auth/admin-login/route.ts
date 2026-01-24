import { NextResponse } from "next/server";

export async function POST() {

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    path: "/", // 🔥 WAJIB
    sameSite: "lax",
  });

  res.cookies.set("session", "true", {
    httpOnly: true,
    path: "/", // 🔥 WAJIB
    sameSite: "lax",
  });

  return res;
}
