"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChapterItem from "./ChapterItem";

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
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = chapters.filter((c) =>
    c.number.toString().includes(query)
  );

  const isSearching = query.trim().length > 0;

  const goToPage = (p: number) => {
    router.replace(`/comic/${comicId}?page=${p}`);
  };

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chapters</h2>

        <input
          type="text"
          placeholder="Cari chapter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md bg-slate-800 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* CHAPTER LIST */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {(isSearching ? filtered : chapters).map((c) => (
          <ChapterItem
            key={c.id}
            comicId={comicId}
            number={c.number}
          />
        ))}
      </div>

      {/* PAGINATION */}
      {!isSearching && (
        <div className="flex justify-center gap-2 pt-6">
          {Array.from({ length: totalPage }).map((_, i) => {
            const p = i + 1;

            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  page === p
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
