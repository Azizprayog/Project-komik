import HomeBanner from "@/components/HomeBanner";
import ComicGrid from "@/components/ComicGrid";
import SectionHeader from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestComics = await prisma.comic.findMany({
    orderBy: { updatedAt: "desc" },
    take: 8,
  });

  const popularComics = await prisma.comic.findMany({
    where: { isPopular: true },
    take: 8,
  });

  const bannerComics = latestComics.slice(0, 4);

  return (
    <main className="space-y-20 px-6 py-10">
      <HomeBanner
        comics={bannerComics.map((c) => ({
          id: c.id,
          title: c.title,
          synopsis: c.synopsis ?? "",
          genre: c.genres ?? "",
        }))}
      />

      <section>
        <SectionHeader
          title="Latest Updates"
          href="/comics/latest"
        />
        <ComicGrid comics={latestComics} />
      </section>

      <section>
        <SectionHeader
          title="Popular Comics"
          href="/comics/popular"
        />
        <ComicGrid comics={popularComics} />
      </section>
    </main>
  );
}
