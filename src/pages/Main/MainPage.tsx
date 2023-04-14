import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { MovieDetails as MovieDetailsType } from '../../data/Movies.model';
import { MovieCards } from '../../components/ui/MovieCards/MovieCards';
import { getMovieDetailsById, useGetPopularMoviesQuery } from '../../services/movieAPI';
import { MovieDetails } from '../../components/ui/MovieDetails/MovieDetails';
import { Modal } from '../../components/Modal/Modal';

import './MainPage.scss';
import { Loader } from '../../components/ui/Loader/Loader';

export const MainPage = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { data: movies = [], isFetching, isLoading } = useGetPopularMoviesQuery();

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

  const searchHandler = useCallback((searchText: string): void => {
    setSearchValue(searchText);
  }, []);

  const movieChosen = useCallback((id: number): void => {
    setSelectedMovieId(id);
  }, []);

  const onClose = () => {
    setShowModal(false);
    setSelectedMovieId(0);
  };

  const renderMovies = isFetching ? (
    <Loader />
  ) : (
    <MovieCards movies={movies} isLoading={isLoading} clickHandler={movieChosen} />
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
