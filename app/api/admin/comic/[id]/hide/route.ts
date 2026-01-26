import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // 🔥 AWAIT PARAMS!
  const { id } = await context.params;
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