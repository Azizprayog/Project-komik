export type ChapterUI = {
  id: number;
  number: number;
};

export type ComicUI = {
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

  lastChapters: ChapterUI[];
};
