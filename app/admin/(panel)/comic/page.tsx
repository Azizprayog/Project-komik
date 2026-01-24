import { prisma } from "@/lib/prisma";
import AdminComicCard from "./AdminComicCard";

export default async function AdminComicListPage() {
  const comics = await prisma.comic.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      coverUrl: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Comics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* ADD */}
        <a
          href="/admin/comic/new"
          className="aspect-[2/3] rounded-xl border-2 border-dashed
                     border-purple-500 flex items-center justify-center
                     text-purple-400 hover:bg-purple-500/10
                     transition text-4xl font-bold"
        >
          +
        </a>

        {comics.map((comic) => (
          <AdminComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  );
}
