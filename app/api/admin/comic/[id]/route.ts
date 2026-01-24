import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ================= UPDATE COMIC ================= */

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, synopsis } = await req.json();

    const comic = await prisma.comic.update({
      where: { id: Number(params.id) },
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
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    // delete pages
    await prisma.page.deleteMany({
      where: {
        chapter: {
          comicId: id,
        },
      },
    });

    // delete chapters
    await prisma.chapter.deleteMany({
      where: { comicId: id },
    });

    // delete comic
    await prisma.comic.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE COMIC ERROR:", error);

    return NextResponse.json(
      { error: "Gagal delete comic" },
      { status: 500 }
    );
  }
}
