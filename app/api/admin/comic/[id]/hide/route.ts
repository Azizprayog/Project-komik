import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log("🔥 HIDE API HIT:", id);

  const comicId = Number(id);

  if (isNaN(comicId)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
    select: { isHidden: true },
  });

  if (!comic) {
    return NextResponse.json(
      { error: "Comic not found" },
      { status: 404 }
    );
  }

  // ✅ INI YANG PENTING — DIBALIK
  const updated = await prisma.comic.update({
    where: { id: comicId },
    data: {
      isHidden: !comic.isHidden,
    },
  });

  return NextResponse.json({
    success: true,
    isHidden: updated.isHidden,
  });
}
