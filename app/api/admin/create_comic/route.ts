import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const comicId = Number(form.get("comicId"));

  if (!file || !comicId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

  fs.writeFileSync(uploadPath, buffer);

  await prisma.comic.update({
    where: { id: comicId },
    data: { coverUrl: `/uploads/${fileName}` }, // ✅ PATH BENAR
  });

  return NextResponse.json({ success: true });
}
