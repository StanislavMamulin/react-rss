import { Loader } from '../Loader/Loader';
import { MovieMainInfo } from '../../../data/Movies.model';
import './MovieCards.scss';
import { CardMovie } from '../CardMovie/CardMovie';

type MovieListProps = {
  movies: MovieMainInfo[];
};

type MovieCardsProps = {
  movies: MovieMainInfo[];
  isLoading: boolean;
};

export const MovieList = ({ movies }: MovieListProps): JSX.Element => {
  const listMovies: JSX.Element[] = movies.map((movie: MovieMainInfo) => (
    <CardMovie movie={movie} key={movie.id} />
  ));

  return <>{listMovies}</>;
};

const NothingFound = (): JSX.Element => (
  <>
    <h3>Nothing found</h3>
  </>
);

export const MovieCards = ({ movies, isLoading }: MovieCardsProps) => {
  return (
    <div className="cards-wrapper">
      {movies.length === 0 ? <NothingFound /> : <MovieList movies={movies} />}
      {isLoading && <Loader />}
    </div>
  );
};
