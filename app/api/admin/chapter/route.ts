import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { comicId } = await req.json();

    const lastChapter = await prisma.chapter.findFirst({
      where: { comicId },
      orderBy: { number: "desc" },
    });

    const nextNumber = (lastChapter?.number ?? 0) + 1;

    const chapter = await prisma.chapter.create({
      data: {
        comicId,
        number: nextNumber,
        title: `Chapter ${nextNumber}`,
      },
    });

    return NextResponse.json({ success: true, chapter });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal tambah chapter" },
      { status: 500 }
    );
  }
}
