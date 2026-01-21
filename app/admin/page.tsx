"use client";

import { useState } from "react";

export default function UploadCover({ comicId }: { comicId: number }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("comicId", String(comicId));

    const res = await fetch("/api/admin/upload-cover", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (!res.ok) alert("Upload gagal");
  }

  return (
    <div className="space-y-3">
      <div className="w-[240px] h-[340px] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden bg-black">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-400 text-sm">No Cover</span>
        )}
      </div>

      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
        <span className="inline-block px-4 py-2 rounded-lg border border-purple-500 text-purple-400 cursor-pointer hover:bg-purple-500/10">
          {loading ? "Uploading..." : "Choose Cover Image"}
        </span>
      </label>
    </div>
  );
}
