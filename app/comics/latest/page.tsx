import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const PER_PAGE = 10;

export default async function LatestPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // ⬇️ WAJIB di-await di Next 16
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const comics = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const total = await prisma.comic.count();
  const comicUI = comics.map(toComicUI);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title="Semua Komik Terbaru" />

      <ComicGrid comics={comicUI} />

      <div className="flex justify-center gap-3 pt-6">
        {page > 1 && (
          <Link
            href={`/comics/latest?page=${page - 1}`}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
          >
            Prev
          </Link>
        )}

        {page * PER_PAGE < total && (
          <Link
            href={`/comics/latest?page=${page + 1}`}
            className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
