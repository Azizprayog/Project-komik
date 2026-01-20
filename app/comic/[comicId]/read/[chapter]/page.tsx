export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

type PageImage = {
  id: number;
  imageUrl: string;
  order: number;
};

export default async function ReadChapter({
  params,
}: {
  params: Promise<{ comicId: string; chapter: string }>;
}) {
  const { comicId, chapter } = await params;

  const comicIdNum = Number(comicId);
  const chapterNum = Number(chapter);

  if (Number.isNaN(comicIdNum) || Number.isNaN(chapterNum)) {
    return (
      <div className="text-center py-20 text-slate-400">
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
      pages: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!chapterData) {
    return (
      <div className="text-center py-20 text-slate-400">
        Chapter tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-xl font-bold">
        Chapter {chapterNum}
      </h1>

      {chapterData.pages.map((p: PageImage) => (
        <img
          key={p.id}
          src={p.imageUrl}
          alt={`Page ${p.order}`}
          className="w-full rounded"
        />
      ))}
    </div>
  );
}
