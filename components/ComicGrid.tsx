import { ComicUI } from "@/lib/types";
import ComicCard from "./ComicCard";

export default function ComicGrid({ comics }: { comics: ComicUI[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
