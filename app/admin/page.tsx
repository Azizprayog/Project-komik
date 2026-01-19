import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const comics = await prisma.comic.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        {/* ➕ TOMBOL TAMBAH COMIC */}
        <Link
          href="/admin/comic/new"
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg">
          +
        </Link>
      </div>

      {/* LIST COMIC */}
      <div className="space-y-3">
        {comics.map((comic) => (
          <Link
            key={comic.id}
            href={`/admin/comic/${comic.id}`}
            className="block border border-slate-700 rounded px-4 py-3 hover:bg-slate-800">
            {comic.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
