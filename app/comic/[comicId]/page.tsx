export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function ComicDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const comicId = Number(params.id);

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
    include: {
      chapters: {
        orderBy: { number: "asc" }, // ✅ 1 → terakhir
      },
    },
  });

  if (!comic) return <div>Comic not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex gap-8">
      <div className="w-[240px] h-[360px] bg-slate-800 rounded-xl overflow-hidden">
        {comic.coverUrl ? (
          <img
            src={comic.coverUrl}
            alt={comic.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-400">Cover</span>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{comic.title}</h1>
        <p className="text-slate-400 mb-4">{comic.synopsis}</p>

        <h2 className="font-semibold mb-2">
          Chapters ({comic.chapters.length})
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {comic.chapters.map((ch) => (
            <a
              key={ch.id}
              href={`/comic/${comic.id}/read/${ch.number}`}
              className="px-4 py-2 rounded bg-slate-800 hover:bg-purple-600 transition"
            >
              Chapter {ch.number}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
