import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // jangan bocorin user exist / tidak
  if (!user) {
    return NextResponse.json({ success: true });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetExpires: new Date(Date.now() + 1000 * 60 * 15), // 15 menit
    },
  });

  const link = `http://localhost:3000/reset-password?token=${token}`;

  console.log("RESET LINK:", link);

  return NextResponse.json({ success: true });
}
