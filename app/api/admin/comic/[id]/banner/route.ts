import { prisma } from "@/lib/prisma";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ⭐ penting
  const comicId = Number(id);

  if (!comicId) {
    return new Response("Invalid ID", { status: 400 });
  }

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
  });

  if (!comic) {
    return new Response("Not found", { status: 404 });
  }

  const updated = await prisma.comic.update({
    where: { id: comicId },
    data: {
      isBanner: !comic.isBanner,
    },
  });

  return Response.json({
    isBanner: updated.isBanner,
  });
}
