import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
