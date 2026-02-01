"use client";

import { useState } from "react";

export default function NewComicForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <form
      action={action}
      className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8"
    >
      {/* LEFT — COVER */}
      <div className="space-y-4">
        <div className="aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="Preview"
            />
          ) : (
            <span className="text-slate-500 text-sm">Preview cover</span>
          )}
        </div>

        <input
          type="file"
          name="cover"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm file:bg-purple-600 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white hover:file:bg-purple-700"
        />
      </div>

      {/* RIGHT — FORM */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Judul
          </label>
          <input
            name="title"
            required
            placeholder="Judul comic..."
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:ring-2 focus:ring-purple-500/60 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Sinopsis
          </label>
          <textarea
            name="synopsis"
            rows={4}
            placeholder="Sinopsis comic..."
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:ring-2 focus:ring-purple-500/60 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-300">
            Genre
          </label>
          <input
            name="genre"
            placeholder="Action, Fantasy"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 focus:ring-2 focus:ring-purple-500/60 outline-none"
          />
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg font-medium transition"
          >
            Tambah Comic
          </button>
        </div>
      </div>
    </form>
  );
}
