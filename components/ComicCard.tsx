import Link from "next/link";
import { ComicUI } from "@/lib/types";

export default function ComicCard({ comic }: { comic: ComicUI }) {
  return (
    <Link
      href={`/comic/${comic.id}`}
      className="bg-slate-900 rounded-xl overflow-hidden hover:scale-[1.02] transition"
    >
      <div className="aspect-[2/3] bg-slate-800">
        {comic.coverUrl ? (
          <img
            src={comic.coverUrl}
            alt={comic.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Cover
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {comic.title}
        </h3>

        {/* 🔥 CHAPTER */}
        {comic.lastChapters?.map((ch) => (
          <div
            key={ch.id}
            className="text-xs bg-slate-800 px-2 py-1 rounded"
          >
            Chapter {ch.number}
          </div>
        ))}
      </div>
    </Link>
  );
}
