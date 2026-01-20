import Link from "next/link";

type Props = {
  comicId: number;
  chapterNumber: number;
};

export default function ChapterItem({
  comicId,
  chapterNumber,
}: Props) {
  return (
    <Link
      href={`/comic/${comicId}/read/${chapterNumber}`}
      className="block rounded-lg bg-slate-800 px-4 py-2 text-center hover:bg-purple-600 transition"
    >
      Chapter {chapterNumber}
    </Link>
  );
}
