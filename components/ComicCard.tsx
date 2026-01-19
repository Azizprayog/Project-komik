import Link from "next/link";
import { Comic } from "@/lib/types";

type Props = {
  comic: Comic;
};

export default function ComicCard({ comic }: Props) {
  // HARD GUARD
  if (!comic || typeof comic.id !== "number") {
    return null;
  }

  return (
    <Link href={`/comic/${comic.id}`} className="block">
      <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 hover:scale-[1.02] transition">
        <div className="h-40 bg-slate-800 rounded mb-3 flex items-center justify-center text-slate-500">
          Cover
        </div>

        <h3 className="font-semibold text-white line-clamp-2">{comic.title}</h3>

        <p className="text-sm text-slate-400 line-clamp-1">
          {comic.genres ?? "-"}
        </p>
      </div>
    </Link>
  );
}
