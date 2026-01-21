import { prisma } from "@/lib/prisma";
import EditComicForm from "./EditComicForm";

export default async function AdminComicEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comicId = Number(id);

  const comic = await prisma.comic.findUnique({
    where: { id: comicId },
    include: {
      chapters: {
        orderBy: { number: "asc" },
      },
    },
  });

  if (!comic) {
    return <div>Comic not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Comic: {comic.title}</h1>

      <EditComicForm comic={comic} />
    </div>
  );
}
