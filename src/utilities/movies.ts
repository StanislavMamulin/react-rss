import { GenresItem } from 'data/Movies.model';

const BASE_URL = 'http://image.tmdb.org/t/p/';
const backdropSizes = ['w300', 'w780', 'w1280', 'original'];
const posterSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];

export const getFullPosterPath = (pathPart: string): string =>
  `${BASE_URL}${posterSizes[4]}${pathPart}`;

export const getFullBackdropPath = (pathPart: string): string =>
  `${BASE_URL}${backdropSizes[2]}${pathPart}`;

export const getGenresList = (genres: GenresItem[]): string =>
  genres.map((genre) => genre.name).join(', ');
