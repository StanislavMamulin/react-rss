export type MovieResponses = {
  page: number;
  results: MovieMainInfo[];
  total_results: number;
  total_pages: number;
};

export type MovieMainInfo = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

type GenresItem = {
  id: number;
  name: string;
};

type productionCompaniesItem = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

type productionCountriesItem = {
  iso_3166_1: string;
  name: string;
};

type spokenLanguagesItem = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: Collection;
  budget: number;
  genres: GenresItem[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  production_companies: productionCompaniesItem[];
  production_countries: productionCountriesItem[];
  release_date: string;
  revenue: number;
  runtime?: number;
  spoken_languages: spokenLanguagesItem[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
