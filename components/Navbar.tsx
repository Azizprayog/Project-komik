"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-950">
      <h1 className="text-xl font-bold text-white">KomikKita</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Cari komik..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-800 text-white outline-none"
        />
      </form>

      <div className="text-sm text-slate-300 space-x-4">
        <a href="/">Home</a>
        <a href="/bookmark">Bookmark</a>
      </div>
    </nav>
  );
}
