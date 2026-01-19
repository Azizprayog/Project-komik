import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { comicId, number } = await req.json();

    if (!comicId || !number) {
      return new Response(
        JSON.stringify({ error: "comicId dan number wajib diisi" }),
        { status: 400 }
      );
    }

    await prisma.chapter.create({
      data: {
        comicId: Number(comicId),
        number: Number(number),
      },
    });

    return Response.json({ success: true });
  } catch (error: any) {
    // kalau chapter dobel
    if (error.code === "P2002") {
      return new Response(
        JSON.stringify({ error: "Chapter sudah ada" }),
        { status: 409 }
      );
    }

    console.error(error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
