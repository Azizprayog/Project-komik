"use client";

import { useEffect, useState } from "react";
import HeroSlide from "./HeroSlide";

type Comic = {
  id: number;
  title: string;
  synopsis: string;
  genre: string;
};

export default function HeroBanner({
  comics,
}: {
  comics: Comic[];
}) {
  const [index, setIndex] = useState(0);
  const total = comics.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(id);
  }, [total]);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="relative h-[360px] md:h-[420px] overflow-hidden rounded-xl">
      {comics.map((comic, i) => (
        <HeroSlide
          key={comic.id}
          comic={comic}
          active={i === index}
        />
      ))}

      {/* ⬇️ CONTROLS BAWAH (MangaDex-style) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20 text-sm">
        <button
          onClick={prev}
          className="text-slate-400 hover:text-white transition"
        >
          ‹ Prev
        </button>

        <span className="text-slate-300">
          No. {index + 1}
        </span>

        <button
          onClick={next}
          className="text-slate-400 hover:text-white transition"
        >
          Next ›
        </button>
      </div>
    </section>
  );
}
