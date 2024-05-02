export interface MovieSearchResults {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  productions: Production[];
  runtime: number;
  original_language: string;
  release_date: string;
  status: string;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Production {
  id: string;
  name: string;
}
