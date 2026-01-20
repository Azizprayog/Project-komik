import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const comicId = Number(searchParams.get("comicId"));

  const chapters = await prisma.chapter.findMany({
    where: { comicId },
    orderBy: { number: "asc" },
  });

  return Response.json(chapters);
}

export async function POST(req: Request) {
  const { comicId, number } = await req.json();

  const exists = await prisma.chapter.findFirst({
    where: { comicId, number },
  });

  if (exists) {
    return Response.json({ error: "Duplicate" }, { status: 400 });
  }

  const chapter = await prisma.chapter.create({
    data: { comicId, number },
  });

  return Response.json(chapter);
}
