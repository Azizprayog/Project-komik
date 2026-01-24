import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BookmarkPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) redirect("/login");

  const userId = Number(session);

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: { comic: true },
  });

  return (
    <div>
      <h1 className="text-xl mb-6">My Bookmarks</h1>

      <div className="grid grid-cols-4 gap-6">
        {bookmarks.map((b) => (
          <div key={b.id}>
            <img src={b.comic.coverUrl ?? ""} />
            <p>{b.comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
