import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File | null;
    const comicId = Number(form.get("comicId"));

    if (!file || !comicId) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    // ===============================
    // SETUP UPLOAD FOLDER
    // ===============================
    const uploadDir = path.join(process.cwd(), "public/cover");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ===============================
    // SAVE FILE
    // ===============================
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const fileName = `comic-${comicId}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    // ===============================
    // UPDATE DB
    // ===============================
    await prisma.comic.update({
      where: { id: comicId },
      data: {
        coverUrl: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
