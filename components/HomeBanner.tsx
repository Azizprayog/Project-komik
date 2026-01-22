"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ComicUI } from "@/lib/types";

type Props = {
  comics: ComicUI[];
};

export default function HomeBanner({ comics }: Props) {
  const [index, setIndex] = useState(0);
  const total = comics.length;

  if (total === 0) return null;

  const comic = comics[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // auto slide
  useEffect(() => {
    if (total <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5000);

    return () => clearInterval(id);
  }, [total]);

  return (
    <div
      className="relative h-[320px] rounded-xl overflow-hidden"
      style={{
        backgroundImage: comic.coverUrl
          ? `url(${comic.coverUrl})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay biar text kebaca */}
      <div className="absolute inset-0 bg-black/60" />

      <Link href={`/comic/${comic.id}`} className="relative z-10 block h-full">
        <div className="h-full px-10 py-8 flex flex-col justify-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-2">{comic.title}</h2>

          {comic.genres && (
            <p className="text-purple-400 text-sm mb-3">{comic.genres}</p>
          )}

          {comic.synopsis && (
            <p className="text-slate-300 text-sm line-clamp-3">
              {comic.synopsis}
            </p>
          )}
        </div>
      </Link>

      {/* controls */}
      {total > 1 && (
        <div className="absolute bottom-6 right-8 z-10 flex items-center gap-3 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
          >
            ‹
          </button>

          <span className="text-xs text-slate-300">
            {index + 1} / {total}
          </span>

          <button
            onClick={next}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
