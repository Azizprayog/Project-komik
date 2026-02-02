import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  try {
    // ================= AUTH =================
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_auth")?.value;

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chapterId = Number(id);

    if (!chapterId) {
      return NextResponse.json(
        { error: "Invalid chapter id" },
        { status: 400 },
      );
    }

    // ================= DELETE =================
    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE CHAPTER ERROR:", err);

    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
