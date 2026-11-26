export interface ShowImage {
  medium: string;
  original: string;
}

export interface ShowRating {
  average: number | null;
}

export interface TvShow {
  id: number;
  name: string;
  genres: string[];
  rating: ShowRating;
  image: ShowImage | null;
  summary: string | null;
  status?: string;
  premiered?: string | null;
}

export interface TvShowSearchItem {
  score: number;
  show: TvShow;
}
