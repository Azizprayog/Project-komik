"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* =======================
   TYPES
======================= */

type Comic = {
  id: number;
  title: string;
  coverUrl: string | null;
  isHidden: boolean;
  isBanner: boolean;
};

/* =======================
   CONFIRM MODAL
======================= */

function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl p-6 animate-in fade-in zoom-in">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <p className="mt-2 text-sm text-zinc-400">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm bg-red-600 hover:bg-red-500 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   ADMIN COMIC CARD
======================= */

export default function AdminComicCard({ comic }: { comic: Comic }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(comic.isHidden);
  const [isBanner, setIsBanner] = useState(comic.isBanner); // ⭐
  const [showConfirm, setShowConfirm] = useState(false);

  /* =======================
     OPEN MODAL (HIDE)
  ======================= */

  function toggleHide(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(true);
  }

  /* =======================
     CONFIRM HIDE
  ======================= */

  async function handleConfirmToggle() {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/comic/${comic.id}/hide`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const t = await res.text();
        alert(`❌ Failed: ${res.status} - ${t}`);
        return;
      }

      const data = await res.json();

      setIsHidden(data.isHidden);
      router.refresh();
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("❌ Network error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  }

  /* =======================
     TOGGLE BANNER ⭐
  ======================= */

  async function toggleBanner(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch(
        `/api/admin/comic/${comic.id}/banner`,
        {
          method: "PATCH",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        alert("❌ Failed toggle banner");
        return;
      }

      const data = await res.json();

      setIsBanner(data.isBanner);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("❌ Network error");
    }
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <>
      <div className="relative group aspect-[2/3] rounded-xl overflow-hidden border border-slate-700">

        {/* =============================
            👉 CLICK AREA FOR EDIT
        ============================== */}
        <Link
          href={`/admin/comic/${comic.id}`}
          className="absolute inset-0 z-20 cursor-pointer"
        />

        {/* =============================
            ⭐ TOGGLE BANNER
        ============================== */}
        <button
          type="button"
          onClick={toggleBanner}
          title={isBanner ? "Banner Active" : "Not Banner"}
          className={`
            absolute top-2 left-2 z-30
            rounded-full w-9 h-9 flex items-center justify-center
            text-white transition
            ${
              isBanner
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-zinc-700 hover:bg-zinc-600"
            }
          `}
        >
          ⭐
        </button>

        {/* =============================
            👁 TOGGLE VISIBILITY
        ============================== */}
        <button
          type="button"
          onClick={toggleHide}
          disabled={loading}
          title={isHidden ? "Hidden" : "Public"}
          className={`
            absolute top-2 right-2 z-30
            rounded-full w-9 h-9 flex items-center justify-center
            text-white transition
            ${
              isHidden
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "⏳" : isHidden ? "🚫" : "👁"}
        </button>

        {/* =============================
            🖼 COVER
        ============================== */}
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

        {/* =============================
            🌫 STATUS OVERLAY
        ============================== */}
        <div
          className="
            absolute inset-0 z-10
            bg-black/60 opacity-0 group-hover:opacity-100
            pointer-events-none
            flex items-center justify-center
            text-white font-semibold transition
          "
        >
          {isHidden ? "Hidden" : "Public"}
        </div>
      </div>

      {/* 🔥 CONFIRM MODAL */}
      <ConfirmModal
        open={showConfirm}
        title={isHidden ? "Publish Comic?" : "Hide Comic?"}
        description={
          isHidden
            ? `Comic "${comic.title}" akan dipublikasikan lagi.`
            : `Comic "${comic.title}" akan disembunyikan dari publik.`
        }
        confirmText={isHidden ? "Publish" : "Hide"}
        loading={loading}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmToggle}
      />
    </>
  );
}
