import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const chapterId = Number(form.get("chapterId"));

    if (!file || !chapterId) {
      return NextResponse.json({ error: "File atau chapterId kosong" }, { status: 400 });
    }

    // bikin nama file unik
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(uploadPath, buffer);

    // cari order terakhir
    const lastPage = await prisma.page.findFirst({
      where: { chapterId },
      orderBy: { order: "desc" },
    });

    const nextOrder = lastPage ? lastPage.order + 1 : 1;

    const page = await prisma.page.create({
      data: {
        chapterId,
        imageUrl: `/uploads/${fileName}`, // ✅ PATH BENAR
        order: nextOrder,
      },
    });

    return NextResponse.json({ success: true, page });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload gagal" }, { status: 500 });
  }
}
