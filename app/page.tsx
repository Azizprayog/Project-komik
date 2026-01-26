export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { toComicUI } from "@/lib/mapper";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import HomeBanner from "@/components/HomeBanner";

export default async function HomePage() {

  // 🔥 BANNER KHUSUS
  const banners = await prisma.comic.findMany({
    where: {
      isHidden: false,
      isBanner: true,
    },
    orderBy: { updatedAt: "desc" },
    take: 5, // bebas mau berapa banner tampil
    include: {
      chapters: {
        orderBy: { number: "desc" },
        take: 2,
      },
    },
  });

  // 🔵 LATEST
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

  // 🟣 POPULAR
  const popular = await prisma.comic.findMany({
    where: { isHidden: false },
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

      {/* 🔥 PAKAI BANNER DARI DB */}
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
