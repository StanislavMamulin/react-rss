import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { MovieMainInfo } from '../../data/Movies.model';
import { getFullPosterPath } from '../../utilities/movies';
import { MovieCards } from '../../components/ui/MovieCards/MovieCards';
import { getPopularMovies, searchMovieByName } from '../../services/movieAPI';
import './MainPage.scss';

export const MainPage = (): JSX.Element => {
  const [movies, setMovies] = useState<MovieMainInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const requestMovies = async (controller: AbortController, searchText?: string) => {
    try {
      let movies: MovieMainInfo[] = await getPopularMovies(controller);
      if (searchText) {
        movies = await searchMovieByName(searchText, controller);
      } else {
        movies = await getPopularMovies(controller);
      }

      movies = movies.map((movie: MovieMainInfo) => ({
        ...movie,
        poster_path: getFullPosterPath(movie.poster_path),
      }));

      setMovies(movies);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    requestMovies(controller);

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    requestMovies(controller, searchValue);

    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [searchValue]);

  const searchHandler = (searchText: string): void => {
    setSearchValue(searchText);
  };

  return (
    <div className="main-page__container">
      <SearchBar searchSubmit={searchHandler} />
      <MovieCards movies={movies} isLoading={isLoading} />
    </div>
  );
};
