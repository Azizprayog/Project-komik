"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Comic = {
  id: number;
  title: string;
  coverUrl: string | null;
  isHidden: boolean;
};

export default function AdminComicCard({ comic }: { comic: Comic }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleHide(e: React.MouseEvent) {
    e.preventDefault();
    

    console.log("🔥 TOGGLE VISIBILITY:", comic.id);

    const ok = confirm(
      comic.isHidden
        ? `Publish comic "${comic.title}"?`
        : `Hide comic "${comic.title}"?`,
    );

    if (!ok) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/comic/${comic.id}/hide`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      console.log("PATCH RESULT:", res.status);

      if (!res.ok) {
        const t = await res.text();
        console.log("BODY:", t);
        alert("❌ Failed toggle visibility");
        return;
      }

      router.refresh();
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("❌ Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative group aspect-[2/3] rounded-xl overflow-hidden border border-slate-700">
      {/* 👁 / 🚫 BUTTON */}
      <button
        type="button"
        onClick={toggleHide}
        disabled={loading}
        title={comic.isHidden ? "Hidden" : "Public"}
        className={`
          absolute top-2 right-2 z-50
          rounded-full w-9 h-9 flex items-center justify-center
          text-white transition
          ${
            comic.isHidden
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-emerald-600 hover:bg-emerald-700"
          }
        `}>
        {loading ? "…" : comic.isHidden ? "🚫" : "👁"}
      </button>

      {/* COVER */}
      {comic.coverUrl ? (
        <img
          src={comic.coverUrl}
          className="w-full h-full object-cover"
          alt={comic.title}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-slate-400 bg-slate-900">
          No Cover
        </div>
      )}

      {/* OVERLAY — GAK NANGKEP CLICK */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 pointer-events-none z-10 flex items-center justify-center text-white font-semibold transition">
        {comic.isHidden ? "Hidden" : "Public"}
      </div>
    </div>
  );
}
