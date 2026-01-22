export type ChapterUI = {
  id: number;
  number: number;
};

export type ComicUI = {
  id: number;
  title: string;
  synopsis: string | null;
  genres: string | null;
  coverUrl: string | null;
  views: number;
  bookmarks: number;
  createdAt: Date;
  updatedAt: Date;

  // 🔥 buat card (2 chapter terakhir)
  lastChapters?: ChapterUI[];
};
