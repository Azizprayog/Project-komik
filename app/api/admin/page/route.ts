import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const chapterId = Number(form.get("chapterId"));

    if (!chapterId) {
      return NextResponse.json(
        { error: "chapterId missing" },
        { status: 400 }
      );
    }

    // sementara dummy page
    await prisma.page.create({
      data: {
        chapterId,
        imageUrl: "placeholder.jpg",
        order: 1, // ⬅️ SESUAI SCHEMA
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload gagal" },
      { status: 500 }
    );
  }
}
