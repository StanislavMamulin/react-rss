import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MovieDetails, MovieMainInfo, MovieResponses } from '../data/Movies.model';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_PARAMS = `api_key=${API_KEY}&language=en-US`;

const MOVIE_REQUEST_PART = `movie`;
const SEARCH_PART = `${BASE_URL}/search/movie?${DEFAULT_PARAMS}&include_adult=false`;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieMainInfo[], void>({
      query: () => `${MOVIE_REQUEST_PART}/popular?${DEFAULT_PARAMS}`,
      transformResponse: (rawResult: MovieResponses) => rawResult.results,
    }),
    searchMovieByName: builder.query<MovieMainInfo[], string>({
      query: (searchText: string) => `${SEARCH_PART}&query=${searchText}`,
      transformResponse: (rawResult: MovieResponses) => rawResult.results,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id: number) => `${MOVIE_REQUEST_PART}/${id}?${DEFAULT_PARAMS}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useSearchMovieByNameQuery, useGetMovieDetailsQuery } =
  movieApi;
