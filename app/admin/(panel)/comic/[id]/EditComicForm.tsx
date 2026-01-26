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

  const [uploadingCover, setUploadingCover] = useState(false);

  /* ================= COVER ================= */

  async function uploadCover(file: File) {
    const prev = preview;

    // optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setPreview(tempUrl);

    const form = new FormData();
    form.append("file", file);
    form.append("comicId", String(comic.id));

    try {
      setUploadingCover(true);

      const res = await fetch("/api/admin/upload-cover", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      router.refresh();
    } catch (err) {
      console.error(err);

      // balikin preview lama
      setPreview(prev);

      alert("Upload cover gagal");
    } finally {
      setUploadingCover(false);
    }
  }

  /* ================= SAVE ================= */

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    const res = await fetch(`/api/admin/comic/${comic.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis }),
      credentials: "include",
    });

    setSaving(false);

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } else {
      alert("Gagal save comic");
    }
  }

  /* ================= CHAPTER ================= */

  async function handleAddChapter() {
    await fetch("/api/admin/chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comicId: comic.id }),
      credentials: "include",
    });

    router.refresh();
  }

  async function handleDeleteChapter(id: number) {
    if (!confirm("Hapus chapter ini?")) return;

    await fetch(`/api/admin/chapter/${id}`, {
      method: "DELETE",
      credentials: "include",
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
      credentials: "include",
    }).then(() => router.refresh());
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* ================= COVER ================= */}

      <div className="space-y-3">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              className={`w-full h-full object-cover ${
                uploadingCover ? "blur-sm opacity-70" : ""
              }`}
            />
          ) : (
            <span className="text-slate-400">No Cover</span>
          )}

          {uploadingCover && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold">
              Uploading...
            </div>
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
            `}>
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </button>
        </div>

        {/* ================= CHAPTER LIST ================= */}

        <div className="pt-6">
          <h3 className="font-semibold mb-2">Chapters</h3>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
            {comic.chapters.map((ch) => (
              <div
                key={ch.id}
                className="flex justify-between items-center bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
                <span>Chapter {ch.number}</span>

                <div className="flex items-center gap-3">
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
