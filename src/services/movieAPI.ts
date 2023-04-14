import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MovieDetails, MovieMainInfo, MovieResponses } from '../data/Movies.model';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_PARAMS = `api_key=${API_KEY}&language=en-US`;
const MOVIE_REQUEST_URL = `${BASE_URL}/movie`;
const SEARCH_URL = `${BASE_URL}/search/movie?${DEFAULT_PARAMS}&include_adult=false`;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieMainInfo[], void>({
      query: () => `${MOVIE_REQUEST_URL}/popular?${DEFAULT_PARAMS}`,
      transformResponse: (rawResult: MovieResponses) => rawResult.results,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = movieApi;

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
    throw err;
  }
};
