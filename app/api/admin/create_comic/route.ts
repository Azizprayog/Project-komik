import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, synopsis } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title wajib diisi" },
        { status: 400 }
      );
    }

    const comic = await prisma.comic.create({
      data: { title, synopsis },
    });

    return NextResponse.json({ success: true, comic });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal membuat comic" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, synopsis } = await req.json();

    const comic = await prisma.comic.update({
      where: { id },
      data: { title, synopsis },
    });

    return NextResponse.json({ success: true, comic });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal update comic" },
      { status: 500 }
    );
  }
}
