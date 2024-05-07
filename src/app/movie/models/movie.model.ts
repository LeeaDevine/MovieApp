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
  production_companies: Production[];
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

// Movie Reviews --
export interface MovieReview {
  id: string;
  author: string;
  content: string;
  created_at: string; //Date convertion
  author_details: {
    name: string;
    avatar_path?: string;
    rating: number;
  };
}

export interface WatchProvider {
  provider_name: string;
  provider_id: number;
  logo_path: string;
}

export interface CountryProviders {
  flatrate?: WatchProvider[]; // Array of providers
}

export interface WatchProvidersResults {
  [countryCode: string]: CountryProviders;
}

export interface WatchProviders {
  id: number;
  results: WatchProvidersResults;
}

// User subscriptions
export interface UserSubscriptions {
  netflix: boolean;
  skyGo: boolean;
  nowTV: boolean;
  amazonVideo: boolean;
  disneyPlus: boolean;
}
