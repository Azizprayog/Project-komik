"use client";

import { useState } from "react";

export default function NewComicPage() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genres, setGenres] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 STATE TOAST (BARU)
  const [success, setSuccess] = useState(false);

  async function submit() {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/create_comic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, synopsis, genres }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Gagal menambahkan comic");
      return;
    }

    // ✅ TOAST MUNCUL
    setSuccess(true);

    // reset form (UI tetap sama)
    setTitle("");
    setSynopsis("");
    setGenres("");

    // ⏱️ toast auto hilang
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }

  return (
    <>
      {/* ================= TOAST (TIDAK UBAH UI FORM) ================= */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fade">
            ✅ Comic berhasil ditambahkan
          </div>
        </div>
      )}
      {/* ============================================================= */}

      {/* ================= UI ASLI (TIDAK DIUBAH) ================= */}
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">Tambah Comic</h1>

        <input
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <textarea
          placeholder="Sinopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <input
          placeholder="Genre (Action, Fantasy)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Menyimpan..." : "Tambah Comic"}
        </button>
      </div>
      {/* ============================================================= */}
    </>
  );
}