import { ComicUI } from "./types";

type ComicDB = {
  id: number;
  title: string;
  synopsis: string;
  genres: string;
  views: number;
  bookmarks: number;
  createdAt: Date;
  updatedAt: Date;
};

export function toComicUI(comic: ComicDB): ComicUI {
  return {
    id: comic.id,
    title: comic.title,
    synopsis: comic.synopsis,
    genres: comic.genres,
    views: comic.views,
    bookmarks: comic.bookmarks,
    createdAt: comic.createdAt,
    updatedAt: comic.updatedAt,
  };
}
