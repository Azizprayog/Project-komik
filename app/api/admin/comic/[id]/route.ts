import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ⬅️ WAJIB await
    const { title, synopsis } = await req.json();

    const comic = await prisma.comic.update({
      where: { id: Number(id) },
      data: { title, synopsis },
    });

    return NextResponse.json({ success: true, comic });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal update comic" },
      { status: 500 }
    );
  }
}
