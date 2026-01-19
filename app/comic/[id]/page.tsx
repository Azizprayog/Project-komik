export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ComicHeader from "@/components/ComicHeader";
import ChapterSection from "@/components/ChapterSection";

const PER_PAGE = 20;

export default async function ComicDetail(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const comicId = Number(params.id);
  if (Number.isNaN(comicId)) {
    return <div>ID komik tidak valid</div>;
  }

  const page = Number(searchParams.page ?? 1);

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
  });

  if (!comic) return <div>Komik tidak ditemukan</div>;

  const chapters = await prisma.chapter.findMany({
    where: { comicId },
    orderBy: { number: "desc" },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const totalChapter = await prisma.chapter.count({
    where: { comicId },
  });

  const totalPage = Math.ceil(totalChapter / PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <ComicHeader comic={comic} />

      <ChapterSection
        comicId={comicId}
        chapters={chapters}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
}
