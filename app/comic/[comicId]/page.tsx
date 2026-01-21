export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ComicHeader from "@/components/ComicHeader";
import ChapterSection from "@/components/ChapterSection";

const PER_PAGE = 20;

export default async function ComicDetail({
  params,
  searchParams,
}: {
  params: Promise<{ comicId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { comicId } = await params;
  const { page } = await searchParams;

  const id = Number(comicId);

  if (Number.isNaN(id)) {
    return (
      <div className="text-center py-20 text-slate-400">
        ID komik tidak valid
      </div>
    );
  }

  const currentPage = Number(page ?? 1);

  const comic = await prisma.comic.findUnique({
    where: { id },
  });

  if (!comic) {
    return (
      <div className="text-center py-20 text-slate-400">
        Komik tidak ditemukan
      </div>
    );
  }

  const chapters = await prisma.chapter.findMany({
    where: { comicId: id },
    orderBy: { number: "desc" },
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const totalChapter = await prisma.chapter.count({
    where: { comicId: id },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <ComicHeader comic={comic} />

      <ChapterSection
        comicId={id}
        chapters={chapters}
        page={currentPage}
        totalPage={Math.ceil(totalChapter / PER_PAGE)}
      />
    </div>
  );
}
