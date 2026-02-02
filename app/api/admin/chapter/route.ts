import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // =====================
    // AUTH
    // =====================
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_auth")?.value;

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // =====================
    // BODY
    // =====================
    const body = await req.json();

    console.log("CHAPTER BODY:", body);

    const { title, number, comicId } = body;

    if (!title || !number || !comicId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // =====================
    // CREATE
    // =====================
    const chapter = await prisma.chapter.create({
      data: {
        title,
        number: Number(number),
        comicId: Number(comicId),
      },
    });

    return NextResponse.json(chapter);
  } catch (err: any) {
    console.error("CREATE CHAPTER ERROR:", err);

    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Chapter number already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
