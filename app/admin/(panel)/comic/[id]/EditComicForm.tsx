"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Chapter = {
  id: number;
  title: string;
  number: number;
};

type Comic = {
  id: number;
  title: string;
  synopsis: string | null;
  coverUrl: string | null;
  chapters: Chapter[];
};

export default function EditComicForm({ comic }: { comic: Comic }) {
  const router = useRouter();

  const [title, setTitle] = useState(comic.title);
  const [synopsis, setSynopsis] = useState(comic.synopsis ?? "");
  const [preview, setPreview] = useState<string | null>(comic.coverUrl);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ================= COVER ================= */

  async function uploadCover(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("comicId", String(comic.id));

    await fetch("/api/admin/upload-cover", {
      method: "POST",
      body: form,
    });

    router.refresh();
  }

  /* ================= SAVE ================= */

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    await fetch(`/api/admin/comic/${comic.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis }),
    });

    setSaving(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  /* ================= CHAPTER ================= */

  async function handleAddChapter() {
    await fetch("/api/admin/chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comicId: comic.id }),
    });

    router.refresh();
  }

  async function handleDeleteChapter(id: number) {
    if (!confirm("Hapus chapter ini?")) return;

    await fetch(`/api/admin/chapter/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  function handleUploadPages(chapterId: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("chapterId", String(chapterId));

    fetch("/api/admin/page", {
      method: "POST",
      body: form,
    }).then(() => router.refresh());
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* ================= COVER ================= */}
      <div className="space-y-3">
        <div className="aspect-[2/3] rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-400">No Cover</span>
          )}
        </div>

        <label className="block">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPreview(URL.createObjectURL(file));
              uploadCover(file);
            }}
          />
          <div className="cursor-pointer text-center px-4 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500/10">
            Choose Cover Image
          </div>
        </label>
      </div>

      {/* ================= INFO ================= */}
      <div className="md:col-span-2 space-y-4">
        <div>
          <label className="text-sm text-slate-400">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Synopsis</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 min-h-[120px]"
          />
        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              px-4 py-2 rounded-lg transition-all duration-300
              ${saving ? "bg-purple-400 opacity-60" : "bg-purple-600"}
              ${saved ? "opacity-40" : ""}
            `}>
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </button>

          <button
            onClick={async () => {
              const ok = confirm(
                "⚠️ Delete this comic?\n\nAll chapters & pages will be removed permanently.",
              );

              if (!ok) return;

              try {
                const res = await fetch(`/api/admin/comic/${comic.id}`, {
                  method: "DELETE",
                });

                if (res.ok) {
                  window.location.href = "/admin";
                } else {
                  alert("❌ Failed to delete comic");
                }
              } catch {
                alert("❌ Server error");
              }
            }}
            className="
    px-5 py-2 rounded-lg font-semibold
    bg-red-600 text-white

    hover:bg-red-500
    hover:shadow-[0_0_22px_rgba(239,68,68,0.6)]
    hover:scale-[1.03]

    active:scale-95
    transition-all duration-200
  ">
            🗑 Delete Comic
          </button>
        </div>

        {/* ================= CHAPTER LIST ================= */}
        <div className="pt-6">
          <h3 className="font-semibold mb-2">Chapters</h3>

          {/* SCROLL AREA */}
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
            {comic.chapters.map((ch) => (
              <div
                key={ch.id}
                className="flex justify-between items-center bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
                <span>Chapter {ch.number}</span>

                <div className="flex items-center gap-3">
                  {/* UPLOAD BOX */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadPages(ch.id, file);
                      }}
                    />
                    <div className="px-3 py-1 rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500/10 text-sm">
                      Upload
                    </div>
                  </label>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDeleteChapter(ch.id)}
                    className="text-red-400 hover:text-red-500 text-lg">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddChapter}
            className="mt-3 px-4 py-2 rounded-lg border border-dashed border-purple-500 text-purple-400 hover:bg-purple-500/10">
            + Add Chapter
          </button>
        </div>
      </div>
    </div>
  );
}
