"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Comic = {
  id: number;
  title: string;
  coverUrl: string | null;
};

export default function AdminComicCard({ comic }: { comic: Comic }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();      // ⛔ stop Link
    e.stopPropagation();

    const ok = confirm(`Delete comic "${comic.title}" ?`);
    if (!ok) return;

    setDeleting(true);

    const res = await fetch(`/api/admin/comic/${comic.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("❌ Delete failed");
      setDeleting(false);
      return;
    }

    // refresh list
    router.refresh();
  }

  return (
    <div className="relative group aspect-[2/3] rounded-xl overflow-hidden border border-slate-700">

      {/* DELETE BUTTON */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="
          absolute top-2 right-2 z-20
          bg-red-600 hover:bg-red-700
          text-white rounded-full
          w-9 h-9 flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        {deleting ? "…" : "🗑"}
      </button>

      {/* CLICK CARD → EDIT */}
      <Link href={`/admin/comic/${comic.id}`} className="block h-full">
        {comic.coverUrl ? (
          <img
            src={comic.coverUrl}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 bg-slate-900">
            No Cover
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition">
          Edit Comic
        </div>
      </Link>
    </div>
  );
}
