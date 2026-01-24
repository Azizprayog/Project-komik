export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ComicActions from "@/components/ComicActions";

const PER_PAGE = 20;

export default async function ComicDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ comicId: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { comicId } = await params;
  const { page = "1", q = "" } = await searchParams;

  const id = Number(comicId);
  const currentPage = Number(page);

  if (!id || Number.isNaN(id)) {
    return <div className="text-center py-20">ID komik tidak valid</div>;
  }

  const comic = await prisma.comic.findUnique({
    where: { id },
  });

  if (!comic) return <div>Comic not found</div>;

  const whereChapter = q
    ? { comicId: id, number: Number(q) }
    : { comicId: id };

  const totalChapters = await prisma.chapter.count({
    where: { comicId: id },
  });

  const chapters = await prisma.chapter.findMany({
    where: whereChapter,
    orderBy: { number: "asc" },
    skip: q ? 0 : (currentPage - 1) * PER_PAGE,
    take: q ? undefined : PER_PAGE,
  });

  const totalPages = Math.ceil(totalChapters / PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 relative">
      {/* BACK BUTTON */}
      <Link
        href="/"
        className="
          absolute top-10 left-6
          bg-gradient-to-r from-slate-900 to-slate-800
          border border-purple-500/30
          px-7 py-3
          rounded-full
          text-sm font-semibold text-white
          transition-all
          hover:border-purple-500
          hover:shadow-[0_0_18px_rgba(168,85,247,0.5)]
          hover:scale-[1.03]
          active:scale-95
        "
      >
        ← Back
      </Link>

      <div className="flex gap-12">
        {/* COVER */}
        <div className="w-[300px] shrink-0">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_40px_-12px_rgba(168,85,247,0.45)]">
            <img
              src={comic.coverUrl || "/placeholder.png"}
              alt={comic.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">{comic.title}</h1>

          <p className="text-slate-400 max-w-xl">
            {comic.synopsis}
          </p>

          {/* 🔥 ACTION BUTTONS */}
          <ComicActions comicId={id} />

          {/* SEARCH */}
          <form className="pt-4 max-w-sm">
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari chapter..."
              className="
                w-full px-4 py-2 rounded-lg
                bg-slate-900
                border border-slate-700
                focus:outline-none
                focus:border-purple-500
              "
            />
          </form>

          {/* CHAPTER LIST */}
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 max-w-xl">
              {chapters.map((ch) => (
                <a
                  key={ch.id}
                  href={`/comic/${id}/read/${ch.number}`}
                  className="
                    px-4 py-2 rounded-lg
                    bg-slate-800/80
                    border border-slate-700
                    hover:border-purple-500
                    hover:bg-purple-500/10
                    transition
                  "
                >
                  Chapter {ch.number}
                </a>
              ))}
            </div>

            {/* PAGINATION */}
            {!q && totalPages > 1 && (
              <div className="flex gap-3 pt-4 items-center">
                {currentPage > 1 && (
                  <a
                    href={`/comic/${id}?page=${currentPage - 1}`}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                  >
                    Prev
                  </a>
                )}

                <span className="px-3 py-1 text-sm text-slate-400">
                  Page {currentPage} / {totalPages}
                </span>

                {currentPage < totalPages && (
                  <a
                    href={`/comic/${id}?page=${currentPage + 1}`}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                  >
                    Next
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
