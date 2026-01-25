import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ================= UPDATE COMIC ================= */

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { title, synopsis } = await req.json();

    const comic = await prisma.comic.update({
      where: { id: Number(id) },
      data: { title, synopsis },
    });

    return NextResponse.json({ success: true, comic });
  } catch (error) {
    console.error("UPDATE COMIC ERROR:", error);

    return NextResponse.json(
      { error: "Gagal update comic" },
      { status: 500 }
    );
  }
}

/* ================= DELETE COMIC ================= */

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log("🔥 DELETE API HIT:", id);

  try {
    const comicId = Number(id);

    if (isNaN(comicId)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    await prisma.page.deleteMany({
      where: {
        chapter: {
          is: { comicId },
        },
      },
    });

    await prisma.chapter.deleteMany({
      where: { comicId },
    });

    await prisma.comic.deleteMany({
      where: { id: comicId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
