import Link from "next/link";
import { ComicUI } from "@/lib/types";

export default function ComicCard({ comic }: { comic: ComicUI }) {
  return (
    <div
      className="
        group
        relative
        bg-slate-900
        rounded-xl
        overflow-hidden
        border border-slate-700/60

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-1
        hover:border-purple-500/70
        hover:shadow-[0_14px_45px_-12px_rgba(168,85,247,0.45)]

        will-change-transform
      "
    >
      {/* glow overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-xl
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          bg-gradient-to-tr
          from-purple-500/10
          via-transparent
          to-pink-500/10
        "
      />

      {/* COVER + TITLE CLICK */}
      <Link href={`/comic/${comic.id}`} className="block">
        <div className="relative aspect-[3/4] bg-slate-800 overflow-hidden">
          {comic.coverUrl ? (
            <img
              src={comic.coverUrl}
              alt={comic.title}
              className="
                w-full h-full object-cover
                transition-transform
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                group-hover:scale-[1.06]
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Cover
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-white">
            {comic.title}
          </h3>
        </div>
      </Link>

      {/* CHAPTER BUTTON */}
      <div className="px-3 pb-3 flex flex-col gap-2">
        {comic.lastChapters?.slice(0, 2).map((ch) => (
          <Link
            key={ch.id}
            href={`/comic/${comic.id}/read/${ch.number}`}
            className="
              text-xs
              bg-slate-800/90
              border border-slate-700/70
              rounded-md
              px-3 py-1.5

              text-slate-200

              hover:bg-purple-500/20
              hover:border-purple-500/60
              transition
            "
          >
            Chapter {ch.number}
          </Link>
        ))}
      </div>
    </div>
  );
}
