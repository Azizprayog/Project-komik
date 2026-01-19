import { prisma } from "@/lib/prisma";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";

export default async function PopularPage() {
  const comics = await prisma.comic.findMany({
    where: { isPopular: true },
    orderBy: { views: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <SectionHeader title="Komik Populer" />
      <ComicGrid comics={comics} />
    </div>
  );
}
