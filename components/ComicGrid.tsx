import { ComicUI } from "@/lib/types";
import ComicCard from "./ComicCard";

export default function ComicGrid({ comics }: { comics: ComicUI[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
