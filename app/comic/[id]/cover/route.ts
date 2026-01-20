import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const file = formData.get("cover") as File | null;

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `cover-${params.id}-${Date.now()}.png`;

  await writeFile(path.join(process.cwd(), "public/uploads", fileName), buffer);

  const coverUrl = `/uploads/${fileName}`;

  await prisma.comic.update({
    where: { id: Number(params.id) },
    data: { coverUrl },
  });

  return Response.json({ success: true, coverUrl });
}
