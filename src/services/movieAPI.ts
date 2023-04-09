import { MovieDetails, MovieMainInfo, MovieResponses } from '../data/Movies.model';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_PARAMS = `api_key=${API_KEY}&language=en-US`;
const MOVIE_REQUEST_URL = `${BASE_URL}/movie`;
const POPULAR_MOVIE_URL = `${MOVIE_REQUEST_URL}/popular?${DEFAULT_PARAMS}`;
const SEARCH_URL = `${BASE_URL}/search/movie?${DEFAULT_PARAMS}&include_adult=false`;

export const getPopularMovies = async (
  controller: AbortController,
  page = 1
): Promise<MovieMainInfo[]> => {
  try {
    const response = await fetch(`${POPULAR_MOVIE_URL}&page=${page}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const movies: MovieResponses = await response.json();

    return movies.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchMovieByName = async (
  searchText: string,
  controller: AbortController
): Promise<MovieMainInfo[]> => {
  try {
    const response = await fetch(`${SEARCH_URL}&query=${searchText}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const movies: MovieResponses = await response.json();

    return movies.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMovieDetailsById = async (
  id: number,
  controller: AbortController
): Promise<MovieDetails> => {
  try {
    const getDetailUrl = `${MOVIE_REQUEST_URL}/${id}?${DEFAULT_PARAMS}`;

    const response: Response = await fetch(getDetailUrl, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const movieDetails: MovieDetails = await response.json();

    return movieDetails;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
