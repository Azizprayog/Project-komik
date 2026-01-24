import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const comicId = Number(formData.get("comicId"));

  if (!file || !comicId) {
    return NextResponse.json(
      { error: "File atau comicId tidak ada" },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public/cover");
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  const coverUrl = `/uploads/${fileName}`;

  await prisma.comic.update({
    where: { id: comicId },
    data: { coverUrl },
  });

  return NextResponse.json({ coverUrl });
}
