"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CoverCard from "./_components/CoverCard";

type Chapter = {
  id: number;
  number: number;
};

export default function AdminComicPage() {
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterNumber, setChapterNumber] = useState("");

  /* =========================
     FETCH COMIC + CHAPTER
  ========================= */
  useEffect(() => {
    if (!id) return;

    fetch(`/api/admin/comic/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title);
        setSynopsis(data.synopsis ?? "");
        setCoverUrl(data.coverUrl ?? null);
      });

    fetch(`/api/admin/chapter?comicId=${id}`)
      .then((r) => r.json())
      .then(setChapters);
  }, [id]);

  /* =========================
     UPDATE TEXT
  ========================= */
  async function updateComic() {
    await fetch(`/api/admin/comic/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis }),
    });

    alert("Comic updated");
  }

  /* =========================
     UPLOAD COVER
  ========================= */
  async function uploadCover(file: File) {
    setCoverPreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("cover", file);

    const res = await fetch(`/api/admin/comic/${id}/cover`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setCoverUrl(data.coverUrl);
    setCoverPreview(null);
  }

  /* =========================
     ADD CHAPTER
  ========================= */
  async function addChapter() {
    if (!chapterNumber) return;

    const res = await fetch("/api/admin/chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comicId: Number(id),
        number: Number(chapterNumber),
      }),
    });

    if (!res.ok) {
      alert("Chapter sudah ada");
      return;
    }

    const newChapter = await res.json();
    setChapters((c) => [...c, newChapter]);
    setChapterNumber("");
  }

  async function deleteChapter(chapterId: number) {
    if (!confirm("Hapus chapter ini?")) return;

    await fetch(`/api/admin/chapter/${chapterId}`, {
      method: "DELETE",
    });

    setChapters((c) => c.filter((x) => x.id !== chapterId));
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <h1 className="text-2xl font-bold">Admin Comic Panel</h1>

      {/* ===== TOP SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* COVER */}
        <CoverCard
          coverUrl={coverUrl}
          previewUrl={coverPreview}
          onPick={uploadCover}
        />

        {/* FORM */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="font-semibold">Judul</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded"
            />
          </div>

          <div>
            <label className="font-semibold">Sinopsis</label>
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-transparent border rounded min-h-[140px]"
            />
          </div>

          <button
            onClick={updateComic}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* ===== CHAPTER SECTION ===== */}
      <div>
        <h2 className="text-xl font-bold mb-4">Chapters</h2>

        <div className="flex gap-3 mb-6">
          <input
            placeholder="Chapter 1"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
            className="px-4 py-2 bg-transparent border rounded w-40"
          />
          <button
            onClick={addChapter}
            className="bg-purple-600 px-4 py-2 rounded text-white"
          >
            Tambah Chapter
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chapters
            .sort((a, b) => b.number - a.number)
            .map((c) => (
              <div
                key={c.id}
                className="border rounded-lg px-4 py-3 flex justify-between items-center"
              >
                <span>Chapter {c.number}</span>
                <button
                  onClick={() => deleteChapter(c.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
