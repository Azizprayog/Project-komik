"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Chapter = {
  id: number;
  number: number;
};

type Props = {
  comicId: number;
  chapters: Chapter[];
  page: number;
  totalPage: number;
};

export default function ChapterSection({
  comicId,
  chapters,
  page,
  totalPage,
}: Props) {
  const [search, setSearch] = useState("");

  /* =========================
     🔎 SEARCH (EXACT MATCH)
     ========================= */
  const filteredChapters = useMemo(() => {
    if (!search.trim()) return chapters;

    const num = Number(search.trim());
    if (Number.isNaN(num)) return [];

    return chapters.filter((c) => c.number === num);
  }, [search, chapters]);

  return (
    <div className="space-y-6">
      {/* SEARCH INPUT */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search chapter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 px-3 py-2 rounded bg-[#1c1c1c] text-sm outline-none"
        />
      </div>

      {/* CHAPTER LIST */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredChapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/comic/${comicId}/read/${chapter.number}`}
            className="block text-center px-4 py-2 rounded bg-[#111] hover:bg-purple-600 transition">
            Chapter {chapter.number}
          </Link>
        ))}

        {filteredChapters.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-10">
            Chapter tidak ditemukan
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPage > 1 && (
        <div className="flex justify-center gap-4 pt-6">
          {page > 1 && (
            <Link
              href={`/comic/${comicId}?page=${page - 1}`}
              className="px-4 py-2 rounded bg-[#1c1c1c]">
              ← Prev
            </Link>
          )}

          <span className="px-4 py-2 text-sm text-slate-400">
            Page {page} / {totalPage}
          </span>

          {page < totalPage && (
            <Link
              href={`/comic/${comicId}?page=${page + 1}`}
              className="px-4 py-2 rounded bg-[#1c1c1c]">
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
