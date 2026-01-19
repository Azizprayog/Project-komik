import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LatestComicsPage() {
  const comics = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title="Latest Updates" />
      <ComicGrid comics={comics} />
    </main>
  );
}
