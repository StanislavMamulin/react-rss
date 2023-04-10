import { Loader } from '../Loader/Loader';
import { MovieMainInfo } from '../../../data/Movies.model';
import { CardMovie } from '../CardMovie/CardMovie';

type MovieListProps = {
  movies: MovieMainInfo[];
  clickHandler: (id: number) => void;
};

type MovieCardsProps = {
  movies: MovieMainInfo[];
  isLoading: boolean;
  clickHandler: (id: number) => void;
};

export const MovieList = ({ movies, clickHandler }: MovieListProps): JSX.Element => {
  const listMovies: JSX.Element[] = movies.map((movie: MovieMainInfo) => (
    <div
      key={movie.id}
      onClick={() => {
        clickHandler(movie.id);
      }}
    >
      <CardMovie movie={movie} />
    </div>
  ));

  return <>{listMovies}</>;
};

const NothingFound = (): JSX.Element => (
  <>
    <h3>Nothing found</h3>
  </>
);

export const MovieCards = ({ movies, isLoading, clickHandler }: MovieCardsProps) => {
  return (
    <div className="cards-wrapper">
      {movies.length === 0 ? (
        <NothingFound />
      ) : (
        <MovieList movies={movies} clickHandler={clickHandler} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
