import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    // ===============================
    // FIND USER
    // ===============================
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ===============================
    // CHECK PASSWORD
    // ===============================
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ===============================
    // ONLY ADMIN ALLOWED
    // ===============================
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 403 }
      );
    }

    // ===============================
    // SET COOKIE
    // ===============================
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    res.cookies.set("session", String(user.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("✅ ADMIN LOGIN:", user.email);

    return res;
  } catch (err) {
    console.error("❌ ADMIN LOGIN ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
