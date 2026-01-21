import { prisma } from "@/lib/prisma";
import ReaderUI from "./ReaderUI";

export default async function ReadChapter({
  params,
}: {
  params: Promise<{ comicId: string; chapter: string }>;
}) {
  // ✅ WAJIB await
  const { comicId, chapter } = await params;

  const comicIdNum = Number(comicId);

  // ✅ AMAN walau chapter undefined / "01" / "chapter-1"
  const chapterNum = Number(
    (chapter ?? "").toString().replace(/\D/g, "")
  );

  if (!comicIdNum || !chapterNum) {
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
      <div className="p-10 text-center text-gray-400">
        Chapter {chapterNum} tidak ditemukan
      </div>
    );
  }

  const chapters = await prisma.chapter.findMany({
    where: { comicId: comicIdNum },
    select: { number: true },
    orderBy: { number: "desc" },
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
