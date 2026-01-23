import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(
    new URL("/admin/login", "http://localhost:3000")
  );

  res.cookies.set("admin_auth", "", {
    path: "/",
    expires: new Date(0),
  });

  return res;
}
