import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NewComicForm from "@/components/admin/NewComicForm";

export default function NewComicPage() {
  async function createComic(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const synopsis = formData.get("synopsis") as string;
    const genres = formData.get("genres") as string;

    const cover = formData.get("cover") as File;

    let coverUrl: string | null = null;

    if (cover && cover.size > 0) {
      const bytes = await cover.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${cover.name}`;
      const path = `./public/cover/${filename}`;

      const fs = await import("fs/promises");
      await fs.writeFile(path, buffer);

      coverUrl = `/cover/${filename}`;
    }

    await prisma.comic.create({
      data: {
        title,
        synopsis,
        genres,
        coverUrl,
      },
    });

    redirect("/admin/comics");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-8">Tambah Comic</h1>

        <NewComicForm action={createComic} />
      </div>
    </div>
  );
}
