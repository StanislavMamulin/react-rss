import { MovieMainInfo, MovieResponses } from '../data/Movies.model';

const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIE_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

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
    console.log(movies);

    return movies.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
