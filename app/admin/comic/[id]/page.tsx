"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function AdminComicPage() {
  const params = useParams();
  const comicId = Number(params.id);

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function addChapter() {
    if (!number) return alert("Nomor chapter wajib diisi");

    setLoading(true);

    await fetch("/api/admin/chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comicId,
        number: Number(number),
      }),
    });

    setNumber("");
    setLoading(false);
    alert("✅ Chapter berhasil ditambahkan");
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-bold">Tambah Chapter</h1>
      <p className="text-sm text-slate-400">Comic ID: {comicId}</p>

      <input
        type="text"
        inputMode="numeric"
        placeholder="Nomor chapter"
        value={number}
        onChange={(e) => {
          // buang semua selain angka
          const val = e.target.value.replace(/\D/g, "");
          setNumber(val);
        }}
        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
      />

      <button
        onClick={addChapter}
        disabled={loading}
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50">
        {loading ? "Menyimpan..." : "Tambah Chapter"}
      </button>
    </div>
  );
}
