import { prisma } from "@/lib/prisma";
import ReaderUI from "./ReaderUI";

export default async function ReadChapter({
  params,
}: {
  params: Promise<{ comicId: string; chapter: string }>;
}) {
  // ✅ WAJIB
  const { comicId, chapter } = await params;

  const comicIdNum = Number(comicId);
  const chapterNum = Number(chapter);

  if (Number.isNaN(comicIdNum) || Number.isNaN(chapterNum)) {
    return (
      <div className="p-10 text-center text-red-400">
        Chapter tidak valid
      </div>
    );
  }

  const chapterData = await prisma.chapter.findFirst({
    where: {
      comicId: comicIdNum,
      number: chapterNum,
    },
    include: {
      pages: { orderBy: { order: "asc" } },
      comic: true,
    },
  });

  if (!chapterData) {
    return (
      <div className="p-10 text-center">
        Chapter tidak ditemukan
      </div>
    );
  }

  // 🔥 ambil semua chapter komik ini
  const chapters = await prisma.chapter.findMany({
    where: { comicId: comicIdNum },
    select: { number: true },
    orderBy: { number: "desc" }, // terbaru di atas (kayak shinigami)
  });

  return (
    <ReaderUI
      comicId={comicIdNum}
      chapterNum={chapterNum}
      comicTitle={chapterData.comic.title}
      pages={chapterData.pages}
      chapters={chapters}
    />
  );
}
