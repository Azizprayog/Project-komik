export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import HomeBanner from "@/components/HomeBanner";

export default async function HomePage() {
  const latest = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
    take: 10,
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2, // 🔥 cuma ambil 2
      },
    },
  });

  const popular = await prisma.comic.findMany({
    orderBy: { views: "desc" },
    take: 10,
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2,
      },
    },
  });

  return (
    <div className="space-y-12">
      <HomeBanner comics={latest.map(toComicUI)} />

      <SectionHeader title="Update" href="/comics/latest" />
      <ComicGrid comics={latest.map(toComicUI)} />

      <SectionHeader title="Komik Populer" href="/comics/popular" />
      <ComicGrid comics={popular.map(toComicUI)} />
    </div>
  );
}
