import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal update comic" },
      { status: 500 }
    );
  }
}
