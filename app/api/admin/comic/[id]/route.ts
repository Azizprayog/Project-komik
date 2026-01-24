import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ================= UPDATE COMIC ================= */

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("🔥 DELETE API HIT:", id);

  try {
    await prisma.page.deleteMany({
      where: {
        chapter: {
          comicId: Number(id),
        },
      },
    });

    await prisma.chapter.deleteMany({
      where: { comicId: Number(id) },
    });

    await prisma.comic.delete({
      where: { id: Number(id) },
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
