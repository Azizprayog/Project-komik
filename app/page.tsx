export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import HomeBanner from "@/components/HomeBanner";

export default async function HomePage() {

  const banners = await prisma.comic.findMany({
    where: {
      isHidden: false,
      isBanner: true,

    },
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2,
      },
    },
  });

  const latest = await prisma.comic.findMany({
    where: { isHidden: false },
    orderBy: { updatedAt: "desc" },
    take: 10,
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2,
      },
    },
  });

  const popular = await prisma.comic.findMany({
    where: {
      isHidden: false,
      isPopular: true,
    },
    orderBy: { updatedAt: "desc" },
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

      {banners.length > 0 && (
        <HomeBanner comics={banners.map(toComicUI)} />
      )}

      <SectionHeader title="Update" href="/comics/latest" />
      <ComicGrid comics={latest.map(toComicUI)} />

      <SectionHeader title="Komik Populer" href="/comics/popular" />
      <ComicGrid comics={popular.map(toComicUI)} />
    </div>
  );
}
