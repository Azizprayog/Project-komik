"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type BannerComic = {
  id: number;
  title: string;
  synopsis: string;
  genre: string;
};

type Props = {
  comics: BannerComic[];
};

export default function HomeBanner({ comics }: Props) {
  const [index, setIndex] = useState(0);
  const total = comics.length;
  const comic = comics[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (total <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5000); // every 5 seconds

    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="relative h-[320px] rounded-xl overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black">
      <Link href={`/comic/${comic.id}`} className="block h-full">
        <div
          key={comic.id}
          className="h-full px-10 py-8 flex flex-col justify-center max-w-2xl transition-all duration-500 ease-out">         <h2 className="text-3xl font-bold mb-2">{comic.title}</h2>
          <p className="text-purple-400 text-sm mb-3">{comic.genre}</p>
          <p className="text-slate-300 text-sm line-clamp-3">
            {comic.synopsis}
          </p>
        </div>
      </Link>

      {/* CONTROLS – MangaDex style */}
      <div className="absolute bottom-6 right-8 flex items-center gap-3 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
        >
          ‹
        </button>

        <span className="text-xs text-slate-300">No. {index + 1}</span>

        <button
          onClick={next}
          className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-sm"
        >
          ›
        </button>
      </div>
    </div>
  );
}
