import ComicCard from "./ComicCard";
import { Comic } from "@/lib/types";

type Props = {
  comics: Comic[];
};

export default function ComicGrid({ comics }: Props) {
  if (!comics || comics.length === 0) {
    return <p className="text-slate-400 text-sm">Belum ada komik</p>;
  }

  return (
    <div
      className="
        grid grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-5
      "
    >
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
