import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const comicId = Number(id);

    if (!comicId || isNaN(comicId)) {
      return NextResponse.json(
        { error: "Invalid comic id" },
        { status: 400 }
      );
    }

    const comic = await prisma.comic.findUnique({
      where: { id: comicId },
      select: { isPopular: true },
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
        isPopular: !comic.isPopular,
      },
    });

    return NextResponse.json({
      success: true,
      isPopular: updated.isPopular,
    });
  } catch (err) {
    console.error("POPULAR TOGGLE ERROR:", err);

    return NextResponse.json(
      { error: "Failed toggle popular" },
      { status: 500 }
    );
  }
}
