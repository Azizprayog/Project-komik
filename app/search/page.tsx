import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim();

  if (!query) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <SectionHeader title="Search" />
        <p className="text-slate-400">
          Masukkan kata kunci pencarian
        </p>
      </main>
    );
  }

  const comics = await prisma.comic.findMany({
    where: {
      isHidden: false,
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2,
      },
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title={`Hasil pencarian: "${query}"`} />
      <ComicGrid comics={comics.map(toComicUI)} />
    </main>
  );
}
