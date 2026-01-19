export const dynamic = "force-dynamic";

import HomeBanner from "@/components/HomeBanner";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";
import { ComicUI } from "@/lib/types";

function toComicUI(c: any): ComicUI | null {
  if (!c || typeof c.id !== "number") return null;

  return {
    id: c.id,
    title: c.title ?? "Untitled",
    synopsis: c.synopsis ?? "",
    genres: c.genres ?? "",
  };
}

export default async function HomePage() {
  const latest = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
    take: 8,
  });

  const popular = await prisma.comic.findMany({
    where: { isPopular: true },
    take: 8,
  });

  const latestSafe = latest.map(toComicUI).filter(Boolean) as ComicUI[];

  const popularSafe = popular.map(toComicUI).filter(Boolean) as ComicUI[];

  return (
    <div className="space-y-10">
      {/* 🔥 BANNER */}
      <HomeBanner comics={latestSafe.slice(0, 4)} />

      <SectionHeader title="Update" />
      <ComicGrid comics={latestSafe} />

      <SectionHeader title="Komik Populer" />
      <ComicGrid comics={popularSafe} />
    </div>
  );
}
