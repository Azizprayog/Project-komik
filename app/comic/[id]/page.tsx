"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AdminEditComic() {
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 ambil data comic awal
  useEffect(() => {
    fetch(`/api/admin/comic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setSynopsis(data.synopsis ?? "");
        setCoverUrl(data.coverUrl ?? null);
      });
  }, [id]);

  // =========================
  // ✏️ UPDATE JUDUL & SINOPSIS
  // =========================
  async function updateComic() {
    setLoading(true);

    await fetch(`/api/admin/comic/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis }),
    });

    setLoading(false);
    alert("Judul & sinopsis berhasil diupdate");
  }

  // =========================
  // 🖼️ UPLOAD / GANTI COVER
  // =========================
  async function uploadCover(file: File) {
    const formData = new FormData();
    formData.append("cover", file);

    const res = await fetch(`/api/admin/comic/${id}/cover`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setCoverUrl(data.coverUrl);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Edit Komik</h1>

      {/* ===== COVER PREVIEW ===== */}
      <div className="space-y-2">
        <p className="font-semibold">Cover</p>

        {coverUrl && (
          <img
            src={coverUrl}
            alt="Cover"
            className="w-40 rounded border"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              uploadCover(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* ===== JUDUL ===== */}
      <div className="space-y-2">
        <p className="font-semibold">Judul</p>
        <input
          className="w-full border rounded px-3 py-2 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* ===== SINOPSIS ===== */}
      <div className="space-y-2">
        <p className="font-semibold">Sinopsis</p>
        <textarea
          className="w-full border rounded px-3 py-2 bg-transparent min-h-[120px]"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
      </div>

      {/* ===== SAVE ===== */}
      <button
        onClick={updateComic}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </div>
  );
}
