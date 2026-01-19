import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";

const PER_PAGE = 10;

export default async function LatestPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);

  const comics = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const total = await prisma.comic.count();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title="Semua Update Terbaru" />

      <ComicGrid comics={comics.map(toComicUI)} />

      {/* Pagination */}
      <div className="flex justify-center gap-3">
        {page > 1 && (
          <a href={`/comics/latest?page=${page - 1}`}>Prev</a>
        )}
        {page * PER_PAGE < total && (
          <a href={`/comics/latest?page=${page + 1}`}>Next</a>
        )}
      </div>
    </div>
  );
}
