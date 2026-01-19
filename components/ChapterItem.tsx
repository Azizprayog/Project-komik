import Link from "next/link";

type ChapterItemProps = {
  comicId: number;
  number: number;
};

export default function ChapterItem({ comicId, number }: ChapterItemProps) {
  return (
    <Link
      href={`/comic/${comicId}/read/${number}`}
      className="block rounded-lg border border-slate-700 px-4 py-3 hover:bg-slate-800 transition"
      >
      Chapter {number}
    </Link>
  );
}
