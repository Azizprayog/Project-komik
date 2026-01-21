"use client";

import { useRef, useState } from "react";

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
  const [title, setTitle] = useState(comic.title);
  const [synopsis, setSynopsis] = useState(comic.synopsis ?? "");
  const [preview, setPreview] = useState<string | null>(comic.coverUrl);

  /* ================= COVER ================= */
  async function uploadCover(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("comicId", String(comic.id));

    await fetch("/api/admin/upload-cover", {
      method: "POST",
      body: form,
    });
  }

  async function handleSave() {
    await fetch(`/api/admin/create_comic/${comic.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis }),
    });

    alert("Comic updated");
  }

  /* ================= CHAPTER ================= */
  async function handleAddChapter() {
    await fetch("/api/admin/chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comicId: comic.id }),
    });

    location.reload();
  }

  async function handleDeleteChapter(chapterId: number) {
    if (!confirm("Hapus chapter ini?")) return;

    await fetch(`/api/admin/chapter/${chapterId}`, {
      method: "DELETE",
    });

    location.reload();
  }

  async function uploadChapterImage(chapterId: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("chapterId", String(chapterId));

    await fetch("/api/admin/page", {
      method: "POST",
      body: form,
    });

    alert("Image uploaded");
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
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPreview(URL.createObjectURL(file));
              uploadCover(file);
            }}
          />
          <span className="block text-center px-4 py-2 rounded-lg border border-purple-500 text-purple-400 cursor-pointer hover:bg-purple-500/10">
            Choose Cover Image
          </span>
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

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 rounded-lg">
            Save
          </button>
          <button className="px-4 py-2 bg-red-600 rounded-lg">Delete</button>
        </div>

        {/* ================= CHAPTER LIST ================= */}
        <div className="pt-6">
          <h3 className="font-semibold mb-3">Chapters</h3>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
            {comic.chapters.map((ch) => {
              const fileRef = useRef<HTMLInputElement>(null);

              return (
                <div
                  key={ch.id}
                  className=" flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-4 py-2">
                  {/* TITLE */}
                  <span className="text-slate-200 truncate">{ch.title}</span>

                  {/* ACTION */}
                  <div className="flex items-center gap-3">
                    {/* UPLOAD BOX */}
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="px-3 py-1 text-sm rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition">
                      Upload
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDeleteChapter(ch.id)}
                      className=" text-red-400 hover:text-red-500 text-lg leading-none"
                      title="Delete chapter">
                      ✕
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadChapterImage(ch.id, file);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleAddChapter}
            className="mt-4 px-4 py-2 rounded-lg border border-dashed border-purple-500 text-purple-400 hover:bg-purple-500/10">
            + Add Chapter
          </button>
        </div>
      </div>
    </div>
  );
}
