import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { comicId } = await req.json();

  const userId = Number(session);

  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_comicId: {
        userId,
        comicId,
      },
    },
  });

  // ===== UNBOOKMARK =====
  if (existing) {
    await prisma.bookmark.delete({
      where: { id: existing.id },
    });

    await prisma.comic.update({
      where: { id: comicId },
      data: {
        bookmarks: { decrement: 1 },
      },
    });

    return NextResponse.json({ bookmarked: false });
  }

  // ===== BOOKMARK =====
  await prisma.bookmark.create({
    data: {
      userId,
      comicId,
    },
  });

  await prisma.comic.update({
    where: { id: comicId },
    data: {
      bookmarks: { increment: 1 },
    },
  });

  return NextResponse.json({ bookmarked: true });
}
