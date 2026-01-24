import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const comicId = Number(searchParams.get("comicId"));

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ bookmarked: false });
  }

  const userId = Number(session);

  const exists = await prisma.bookmark.findUnique({
    where: {
      userId_comicId: {
        userId,
        comicId,
      },
    },
  });

  return NextResponse.json({ bookmarked: !!exists });
}
