import { Comic } from "@prisma/client";
import { ComicUI } from "./types";

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
  genre: string | null;
  coverUrl: string | null;

  views: number;
  bookmarks: number;

  createdAt: Date;
  updatedAt: Date;

  isHidden: boolean;
  isBanner: boolean;
  isPopular: boolean;

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
export function toComicUI(comic: ComicDBWithLastChapters): ComicUI {
  return {
    id: comic.id,
    title: comic.title,
    synopsis: comic.synopsis,
    genre: comic.genre,
    coverUrl: comic.coverUrl,

    views: comic.views,
    bookmarks: comic.bookmarks,

    createdAt: comic.createdAt,
    updatedAt: comic.updatedAt,

    // 🔥 STATUS FLAGS
    isHidden: comic.isHidden,
    isBanner: comic.isBanner,
    isPopular: comic.isPopular,

    // 2 chapter terakhir
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
export function toComicUISimple(comic: Comic): ComicUI {
  return {
    id: comic.id,
    title: comic.title,
    synopsis: comic.synopsis,
    genre: comic.genre,
    coverUrl: comic.coverUrl,

    views: comic.views,
    bookmarks: comic.bookmarks,

    createdAt: comic.createdAt,
    updatedAt: comic.updatedAt,

    // 🔥 STATUS FLAGS
    isHidden: comic.isHidden,
    isBanner: comic.isBanner,
    isPopular: comic.isPopular,

    // list biasa tidak perlu chapter
    lastChapters: [],
  };
}
