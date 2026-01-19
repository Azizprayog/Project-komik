"use client";

import Link from "next/link";

type Comic = {
  id: number;
  title: string;
  genres: string | null;
  synopsis: string | null;
};

export default function ComicHeader({ comic }: { comic: Comic }) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Cover */}
      <div className="w-full md:w-64 shrink-0">
        <div className="aspect-[3/4] bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500">
          Cover
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{comic.title}</h1>
        <p className="text-zinc-400 text-sm">{comic.genres}</p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={`/comic/${comic.id}/read`}
            className="px-5 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition">
            Start Reading
          </a>
          <button className="px-5 py-2 rounded-md border border-zinc-600 text-zinc-300">
            Bookmark
          </button>
        </div>

        {/* ✅ SYNOPSIS PINDAH KE SINI */}
        <div className="pt-4">
          <h2 className="text-lg font-semibold mb-1">Synopsis</h2>
          <p className="text-zinc-300 leading-relaxed">
            {comic.synopsis ?? "Sinopsis belum tersedia"}
          </p>
        </div>
      </div>
    </div>
  );
}
