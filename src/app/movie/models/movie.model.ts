export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  runtime?: number; //Optional
  original_language?: string; //Optional
  release_date?: string; //Optional
  status?: string; //Optional
  vote_average?: number; //Optional
  vote_count?: number; //Optional
}

export interface Genre {
  id: number;
  name: string;
}
