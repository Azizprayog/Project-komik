"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ComicActions({ comicId }: { comicId: number }) {
  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // cek status bookmark saat load
  useEffect(() => {
    fetch(`/api/bookmark/status?comicId=${comicId}`)
      .then((res) => {
        if (res.status === 401) return;
        return res.json();
      })
      .then((data) => {
        if (data?.bookmarked) {
          setBookmarked(true);
        }
      });
  }, [comicId]);

  async function toggleBookmark() {
    setLoading(true);

    const res = await fetch("/api/bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comicId }),
    });

    // 🔥 BELUM LOGIN → REDIRECT
    if (res.status === 401) {
      router.push("/login");
      return;
    }

    const data = await res.json();
    setBookmarked(data.bookmarked);

    setLoading(false);
  }

  function handleStartReading() {
    router.push(`/comic/${comicId}/read/1`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-sm">
      {/* START */}
      <button
        onClick={handleStartReading}
        className="
          flex-1 py-2 rounded-lg font-medium
          bg-purple-600 hover:bg-purple-500
          transition-all
          hover:shadow-[0_0_18px_rgba(168,85,247,0.6)]
          active:scale-95
        "
      >
        ▶ Start Reading
      </button>

      {/* BOOKMARK */}
      <button
        onClick={toggleBookmark}
        disabled={loading}
        className={`
          flex-1 py-2 rounded-lg border transition-all
          active:scale-95
          ${
            bookmarked
              ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.6)]"
              : "bg-slate-800 border-slate-700 hover:bg-slate-700"
          }
        `}
      >
        ⭐ {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
}
