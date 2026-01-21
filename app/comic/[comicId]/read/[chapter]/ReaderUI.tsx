"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PageImage = {
  id: number;
  imageUrl: string;
  order: number;
};

type Chapter = {
  number: number;
};

type Props = {
  comicId: number;
  chapterNum: number;
  comicTitle: string;
  pages: PageImage[];
  chapters: Chapter[];
};

export default function ReaderUI({
  comicId,
  chapterNum,
  comicTitle,
  pages,
  chapters,
}: Props) {
  const [showUI, setShowUI] = useState(true);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredChapters = useMemo(() => {
    if (!search) return chapters;
    return chapters.filter((c) =>
      String(c.number).includes(search)
    );
  }, [search, chapters]);

  const currentIndex = chapters.findIndex(
    (c) => c.number === chapterNum
  );

  const prevChapter = chapters[currentIndex + 1];
  const nextChapter = chapters[currentIndex - 1];

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowChapterModal(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* CLICK TO HIDE */}
      <div
        className="fixed inset-0 z-10"
        onClick={() => setShowUI((v) => !v)}
      />

      {/* TOP BAR */}
      {showUI && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-6 bg-black/80 backdrop-blur px-8 py-3 rounded-full max-w-[600px]">
            <Link href={`/comic/${comicId}`} className="text-2xl">←</Link>

            <div className="text-sm truncate text-center flex-1">
              {comicTitle} — Chapter {chapterNum}
            </div>

            <Link href="/" className="text-2xl">⌂</Link>
          </div>
        </div>
      )}

      {/* PAGES */}
      <div className="relative z-0 max-w-3xl mx-auto py-24 space-y-4">
        {pages.map((p) => (
          <img key={p.id} src={p.imageUrl} className="w-full rounded" />
        ))}
      </div>

      {/* BOTTOM BAR */}
      {showUI && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-10 bg-black/80 backdrop-blur px-10 py-4 rounded-full">
            {prevChapter && (
              <Link
                href={`/comic/${comicId}/read/${prevChapter.number}`}
                className="text-3xl"
              >
                ←
              </Link>
            )}

            <button
              onClick={() => setShowChapterModal(true)}
              className="text-3xl"
            >
              ≡
            </button>

            {nextChapter && (
              <Link
                href={`/comic/${comicId}/read/${nextChapter.number}`}
                className="text-3xl"
              >
                →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER MODAL */}
      {showChapterModal && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur flex justify-center items-center"
          onClick={() => setShowChapterModal(false)}
        >
          <div
            className="bg-[#111] w-[90%] max-w-md rounded-xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Search Chapter</h2>
              <button onClick={() => setShowChapterModal(false)}>×</button>
            </div>

            <input
              className="w-full mb-4 px-4 py-2 rounded bg-[#222]"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredChapters.map((c) => (
                <Link
                  key={c.number}
                  href={`/comic/${comicId}/read/${c.number}`}
                  onClick={() => setShowChapterModal(false)}
                  className={`block px-4 py-2 rounded ${
                    c.number === chapterNum
                      ? "bg-purple-600"
                      : "bg-[#1c1c1c]"
                  }`}
                >
                  Chapter {c.number}
                </Link>
              ))}
            </div>

            {/* UP / DOWN DI MODAL */}
            <div className="flex justify-between mt-4 text-sm text-gray-300">
              {chapters.at(-1) && (
                <Link
                  href={`/comic/${comicId}/read/${chapters.at(-1)!.number}`}
                  onClick={() => setShowChapterModal(false)}
                >
                  ⬆ First
                </Link>
              )}
              {chapters[0] && (
                <Link
                  href={`/comic/${comicId}/read/${chapters[0].number}`}
                  onClick={() => setShowChapterModal(false)}
                >
                  ⬇ Last
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
