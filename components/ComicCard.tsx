import Link from "next/link";
import { Comic } from "@/lib/types";

export default function ComicCard({ comic }: { comic?: Comic }) {
  if (!comic || !comic.id) return null;

  return (
    <Link href={`/comic/${comic.id}`}>
      <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 hover:scale-[1.02] transition">
        <div className="h-40 bg-slate-800 rounded mb-3 flex items-center justify-center text-slate-500">
          Cover
        </div>

        <h3 className="font-semibold text-white line-clamp-2 overflow-hidden">
          {comic.title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-1">
          {comic.genres}
        </p>
      </div>
    </Link>
  );
}
