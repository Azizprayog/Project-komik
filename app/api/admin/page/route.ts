import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  console.log("🔥 UPLOAD CHAPTER PAGE API HIT");

  try {
    const form = await req.formData();

    const file = form.get("file") as File | null;
    const chapterId = Number(form.get("chapterId"));

    if (!file || !chapterId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be image" },
        { status: 400 }
      );
    }

    // 🔍 get comicId from chapter
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { comicId: true },
    });

    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    const comicId = chapter.comicId;

    // 📁 public/comic/{comicId}/chapter/{chapterId}
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "comic",
      String(comicId),
      "chapter",
      String(chapterId)
    );

    fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);

    const count = await prisma.page.count({
      where: { chapterId },
    });

    const order = count + 1;
    const fileName = `${String(order).padStart(3, "0")}${ext}`;

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    const publicUrl = `/comic/${comicId}/chapter/${chapterId}/${fileName}`;

    const page = await prisma.page.create({
      data: {
        chapterId,
        order,
        imageUrl: publicUrl,
      },
    });

    return NextResponse.json({ success: true, page });
  } catch (err) {
    console.error("❌ UPLOAD PAGE ERROR:", err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
