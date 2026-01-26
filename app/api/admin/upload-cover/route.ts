import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  console.log("🔥 UPLOAD COVER API HIT");

  try {
    const form = await req.formData();

    const file = form.get("file") as File | null;
    const comicId = Number(form.get("comicId"));

    if (!file || !comicId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be image" },
        { status: 400 }
      );
    }

    // 📁 public/cover
    const uploadDir = path.join(process.cwd(), "public", "cover");
    fs.mkdirSync(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const fileName = `comic-${comicId}-${Date.now()}${ext}`;

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    const publicUrl = `/cover/${fileName}`;

    await prisma.comic.update({
      where: { id: comicId },
      data: { coverUrl: publicUrl },
    });

    return NextResponse.json({ success: true, coverUrl: publicUrl });
  } catch (err) {
    console.error("❌ UPLOAD COVER ERROR:", err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
