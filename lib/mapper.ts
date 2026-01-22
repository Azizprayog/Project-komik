import { ComicUI, ChapterUI } from "./types";

/**
 * UNTUK HOME / UPDATE / POPULAR
 * WAJIB query include chapters (take 2)
 */
export type ComicDBWithLastChapters = {
  id: number;
  title: string;
  synopsis: string | null;
  genres: string | null;
  coverUrl: string | null;
  views: number;
  bookmarks: number;
  createdAt: Date;
  updatedAt: Date;
  chapters: {
    id: number;
    number: number;
  }[];
};

export function toComicUI(
  comic: ComicDBWithLastChapters
): ComicUI {
  return {
    id: comic.id,
    title: comic.title,
    synopsis: comic.synopsis,
    genres: comic.genres,
    coverUrl: comic.coverUrl,
    views: comic.views,
    bookmarks: comic.bookmarks,
    createdAt: comic.createdAt,
    updatedAt: comic.updatedAt,

    // 🔥 2 chapter terakhir (sudah di-sort desc dari query)
    lastChapters: comic.chapters.map((ch) => ({
      id: ch.id,
      number: ch.number,
    })),
  };
}
