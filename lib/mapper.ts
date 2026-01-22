import { ComicUI } from "./types";
import { Comic } from "@prisma/client";

/**
 * ============================================
 * TYPE KHUSUS UNTUK HOME / UPDATE / POPULAR
 * (WAJIB include chapters: take 2 + order desc)
 * ============================================
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

/**
 * ============================================
 * 🔥 Mapper untuk Home / Update / Popular
 * ============================================
 */
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

    // 2 chapter terakhir (diasumsikan sudah order desc dari query)
    lastChapters: comic.chapters.map((ch) => ({
      id: ch.id,
      number: ch.number,
    })),
  };
}

/**
 * ============================================
 * 🟢 Mapper untuk LIST BIASA
 * (Latest / Search / Browse)
 * ============================================
 */
export function toComicUISimple(
  comic: Comic
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

    // list biasa tidak perlu chapter
    lastChapters: [],
  };
}
