import Link from "next/link";
import { ComicUI } from "@/lib/types";

export default function ComicCard({ comic }: { comic: ComicUI }) {
  return (
    <Link
      href={`/comic/${comic.id}`}
      className="
        group
        bg-slate-900
        border border-slate-700
        rounded-xl
        overflow-hidden
        hover:border-purple-500
        transition
      "
    >
      {/* COVER */}
      <div className="aspect-[3/4] bg-slate-800 overflow-hidden">
        {comic.coverUrl ? (
          <img
            src={comic.coverUrl}
            alt={comic.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            Cover
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold line-clamp-2">
          {comic.title}
        </h3>

        {comic.genres && (
          <p className="text-xs text-slate-400 line-clamp-1">
            {comic.genres}
          </p>
        )}

        {/* 🔥 CHAPTER TERAKHIR */}
        <div className="mt-2 space-y-1">
          {comic.lastChapters?.map((ch) => (
            <div
              key={ch.id}
              className="text-xs bg-slate-800 px-2 py-1 rounded"
            >
              Chapter {ch.number}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
