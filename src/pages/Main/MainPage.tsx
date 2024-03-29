import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { MovieMainInfo } from '../../data/Movies.model';
import { MovieCards } from '../../components/ui/MovieCards/MovieCards';
import { useGetPopularMoviesQuery, useSearchMovieByNameQuery } from '../../services/movieAPI';

import './MainPage.scss';
import { Loader } from '../../components/ui/Loader/Loader';
import { RootState } from '../../redux/store';
import { setSearchMovie } from '../../redux/movieSlice';
import { DetailsModal } from '../../components/DetailsModal/DetailsModal';
import { ClientOnlyPortal } from '../../components/Modal/ClientOnlyPortal';

export const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const searchValue = useSelector((state: RootState) => state.movies.searchMovieName);

  const { data: popularMovies = [], isFetching } = useGetPopularMoviesQuery(undefined, {
    skip: searchValue !== '',
  });
  const {
    data: findedMovies = [],
    isLoading,
    isFetching: isSearchFetching,
  } = useSearchMovieByNameQuery(searchValue, {
    skip: searchValue === '',
  });

  const movies: MovieMainInfo[] = popularMovies.length !== 0 ? popularMovies : findedMovies;

  const searchHandler = useCallback(
    (searchText: string): void => {
      dispatch(setSearchMovie(searchText));
    },
    [dispatch]
  );

  const movieChosen = useCallback((id: number): void => {
    setSelectedMovieId(id);
    setShowModal(true);
  }, []);

  const onClose = () => {
    setShowModal(false);
    setSelectedMovieId(0);
  };

  const renderModal = (
    <ClientOnlyPortal>
      <DetailsModal onClose={onClose} selectedMovieId={selectedMovieId} />
    </ClientOnlyPortal>
  );

  const renderMovies =
    isFetching || isLoading || isSearchFetching ? (
      <Loader />
    ) : (
      <MovieCards movies={movies} clickHandler={movieChosen} />
    );

  return (
    <div className="main-page__container">
      <SearchBar searchSubmit={searchHandler} />
      {renderMovies}
      {showModal && renderModal}
    </div>
  );
};
