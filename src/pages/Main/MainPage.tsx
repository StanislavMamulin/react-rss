import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { MovieMainInfo } from '../../data/Movies.model';
import { getFullPosterPath } from '../../utilities/movies';
import { MovieCards } from '../../components/ui/MovieCards/MovieCards';
import { getMovieDetailsById, getPopularMovies, searchMovieByName } from '../../services/movieAPI';
import './MainPage.scss';

export const MainPage = (): JSX.Element => {
  const [movies, setMovies] = useState<MovieMainInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);

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

  useEffect(() => {
    if (selectedMovieId === 0) return;

    const controller = new AbortController();
    setIsLoading(true);

    const getMovieDetails = async (id: number) => {
      const details = await getMovieDetailsById(id, controller);
      setIsLoading(false);
    };

    getMovieDetails(selectedMovieId);

    return () => {
      if (selectedMovieId === 0) return;

      setIsLoading(false);
      controller.abort();
    };
  }, [selectedMovieId]);

  const searchHandler = (searchText: string): void => {
    setSearchValue(searchText);
  };

  const movieChosen = (id: number): void => {
    setSelectedMovieId(id);
  };

  return (
    <div className="main-page__container">
      <SearchBar searchSubmit={searchHandler} />
      <MovieCards movies={movies} isLoading={isLoading} clickHandler={movieChosen} />
    </div>
  );
};
