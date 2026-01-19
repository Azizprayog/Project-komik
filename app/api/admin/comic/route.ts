import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, synopsis, genres } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Judul wajib diisi" }, { status: 400 });
    }

    const comic = await prisma.comic.create({
      data: {
        title,
        synopsis: synopsis || null,
        genres: genres || null,
      },
    });

    return NextResponse.json({ success: true, comic });
  } catch (err) {
    console.error("CREATE COMIC ERROR:", err);
    return NextResponse.json(
      { error: "Gagal menambahkan comic" },
      { status: 500 }
    );
  }
}
