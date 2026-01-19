import { prisma } from "@/lib/prisma";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";

const PER_PAGE = 24;

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
      <SectionHeader title="Semua Komik Terbaru" />

      <ComicGrid comics={comics} />

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 pt-6">
        {page > 1 && (
          <a
            href={`/latest?page=${page - 1}`}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
          >
            Prev
          </a>
        )}

        {page * PER_PAGE < total && (
          <a
            href={`/latest?page=${page + 1}`}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
