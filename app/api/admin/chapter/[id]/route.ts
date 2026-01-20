import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await prisma.chapter.delete({
    where: { id: Number(params.id) },
  });

  return Response.json({ success: true });
}
