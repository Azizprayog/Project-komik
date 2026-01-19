export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ComicHeader from "@/components/ComicHeader";
import ChapterSection from "@/components/ChapterSection";
import { notFound } from "next/navigation";

const PER_PAGE = 20;

type PageProps = {
  params: {
    id?: string;
  };
  searchParams?: {
    page?: string;
  };
};

export default async function ComicDetail({
  params,
  searchParams,
}: PageProps) {
  /* ===============================
     1. VALIDASI PARAM ID
  =============================== */
  if (!params?.id) {
    notFound();
  }

  const comicId = Number(params.id);
  if (Number.isNaN(comicId)) {
    notFound();
  }

  /* ===============================
     2. VALIDASI PAGE
  =============================== */
  const page = Math.max(
    1,
    Number(searchParams?.page ?? 1)
  );

  /* ===============================
     3. AMBIL DATA COMIC
  =============================== */
  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
  });

  if (!comic) {
    notFound();
  }

  /* ===============================
     4. AMBIL CHAPTERS
  =============================== */
  const chapters = await prisma.chapter.findMany({
    where: { comicId },
    orderBy: { number: "desc" },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const totalChapter = await prisma.chapter.count({
    where: { comicId },
  });

  const totalPage = Math.max(
    1,
    Math.ceil(totalChapter / PER_PAGE)
  );

  /* ===============================
     5. RENDER
  =============================== */
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <ComicHeader comic={comic} />

      {/* Chapter list */}
      <ChapterSection
        comicId={comicId}
        chapters={chapters ?? []}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
}
