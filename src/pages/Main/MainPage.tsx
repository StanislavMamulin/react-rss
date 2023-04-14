import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { MovieDetails as MovieDetailsType, MovieMainInfo } from '../../data/Movies.model';
import { MovieCards } from '../../components/ui/MovieCards/MovieCards';
import {
  getMovieDetailsById,
  useGetPopularMoviesQuery,
  useSearchMovieByNameQuery,
} from '../../services/movieAPI';
import { MovieDetails } from '../../components/ui/MovieDetails/MovieDetails';
import { Modal } from '../../components/Modal/Modal';

import './MainPage.scss';
import { Loader } from '../../components/ui/Loader/Loader';
import { RootState } from '../../redux/store';
import { setSearchMovie } from '../../redux/movieSlice';

export const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const searchValue = useSelector((state: RootState) => state.movies.searchMovieName);

  const { data: popularMovies = [], isFetching } = useGetPopularMoviesQuery(undefined, {
    skip: searchValue !== '',
  });
  const { data: findedMovies = [], isLoading } = useSearchMovieByNameQuery(searchValue, {
    skip: searchValue === '',
  });

  const movies: MovieMainInfo[] = popularMovies.length !== 0 ? popularMovies : findedMovies;

  useEffect(() => {
    if (selectedMovieId === 0) return;

    const controller = new AbortController();

    const getMovieDetails = async (id: number) => {
      const details = await getMovieDetailsById(id, controller);
      setMovieDetails(details);
      setShowModal(true);
    };

    getMovieDetails(selectedMovieId);

    return () => {
      if (selectedMovieId === 0) return;

      controller.abort();
    };
  }, [selectedMovieId]);

  const searchHandler = useCallback(
    (searchText: string): void => {
      dispatch(setSearchMovie(searchText));
    },
    [dispatch]
  );

  const movieChosen = useCallback((id: number): void => {
    setSelectedMovieId(id);
  }, []);

  const onClose = () => {
    setShowModal(false);
    setSelectedMovieId(0);
  };

  const renderMovies =
    isFetching || isLoading ? (
      <Loader />
    ) : (
      <MovieCards movies={movies} clickHandler={movieChosen} />
    );

  const renderModal =
    movieDetails &&
    showModal &&
    createPortal(
      <Modal onClose={onClose}>
        <MovieDetails movieDetails={movieDetails} />
      </Modal>,
      document.body
    );

  return (
    <div className="main-page__container">
      <SearchBar searchSubmit={searchHandler} />
      {renderModal}
      {renderMovies}
    </div>
  );
};
