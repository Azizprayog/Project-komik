export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ComicHeader from "@/components/ComicHeader";
import ChapterSection from "@/components/ChapterSection";

const PER_PAGE = 20;

export default async function ComicDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  // ✅ WAJIB unwrap Promise
  const { id } = await params;
  const { page } = await searchParams;

  const comicId = Number(id);
  if (!id || Number.isNaN(comicId)) {
    return (
      <div className="text-center text-slate-400 py-20">
        ID komik tidak valid
      </div>
    );
  }

  const currentPage = Number(page ?? 1);

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
  });

  if (!comic) {
    return (
      <div className="text-center text-slate-400 py-20">
        Komik tidak ditemukan
      </div>
    );
  }

  const chapters = await prisma.chapter.findMany({
    where: { comicId },
    orderBy: { number: "desc" },
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const totalChapter = await prisma.chapter.count({
    where: { comicId },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <ComicHeader comic={comic} />

      <ChapterSection
        comicId={comicId}
        chapters={chapters}
        page={currentPage}
        totalPage={Math.ceil(totalChapter / PER_PAGE)}
      />
    </div>
  );
}
