import Link from "next/link";

export default function HeroSlide({
  comic,
  active,
}: {
  comic: any;
  active: boolean;
}) {
  return (
    <Link
      href={`/comic/${comic.id}`}
      className={`absolute inset-0 transition-opacity duration-700 ${
        active ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2 line-clamp-2">
          {comic.title}
        </h2>

        <p className="text-sm text-purple-400 mb-2">
          {comic.genre}
        </p>

        <p className="text-slate-400 max-w-xl line-clamp-3">
          {comic.synopsis}
        </p>
      </div>
    </Link>
  );
}
