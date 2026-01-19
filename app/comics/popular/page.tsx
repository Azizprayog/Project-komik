import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PopularComicsPage() {
  const comics = await prisma.comic.findMany({
    where: { isPopular: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title="Popular Comics" />
      <ComicGrid comics={comics} />
    </main>
  );
}
