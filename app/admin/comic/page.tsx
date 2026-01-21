import Link from "next/link";
import { prisma } from "@/lib/prisma";

type AdminComic = {
  id: number;
  title: string;
  coverUrl: string | null;
};

export default async function AdminComicListPage() {
  const comics = (await prisma.comic.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      coverUrl: true,
    },
  })) as AdminComic[];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Comics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* ADD NEW COMIC */}
        <Link
          href="/admin/comic/new"
          className="aspect-[2/3] rounded-xl border-2 border-dashed
                     border-purple-500 flex items-center justify-center
                     text-purple-400 hover:bg-purple-500/10
                     transition text-4xl font-bold"
        >
          +
        </Link>

        {/* COMIC CARDS */}
        {comics.map((comic) => (
          <Link
            key={comic.id}
            href={`/admin/comic/${comic.id}`}
            className="group relative aspect-[2/3] rounded-xl
                       overflow-hidden border border-slate-700 cursor-pointer"
          >
            {comic.coverUrl ? (
              <img
                src={comic.coverUrl}
                alt={comic.title}
                className="w-full h-full object-cover
                           group-hover:scale-105 transition"
              />
            ) : (
              <div className="w-full h-full flex items-center
                              justify-center bg-slate-900
                              text-slate-400">
                No Cover
              </div>
            )}

            {/* OVERLAY */}
            <div
              className="absolute inset-0 bg-black/60
                         opacity-0 group-hover:opacity-100
                         flex items-center justify-center
                         text-white font-semibold transition"
            >
              Edit Comic
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
