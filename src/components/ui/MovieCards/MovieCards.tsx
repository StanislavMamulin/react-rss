import { MovieMainInfo } from '../../../data/Movies.model';
import { CardMovie } from '../CardMovie/CardMovie';
import { getFullPosterPath } from '../../../utilities/movies';

type MovieListProps = {
  movies: MovieMainInfo[];
  clickHandler: (id: number) => void;
};

type MovieCardsProps = {
  movies: MovieMainInfo[];
  clickHandler: (id: number) => void;
};

export const MovieList = ({ movies, clickHandler }: MovieListProps): JSX.Element => {
  const listMovies: JSX.Element[] = movies.map((movie: MovieMainInfo) => {
    const movieWithFullPosterPath: MovieMainInfo = {
      ...movie,
      poster_path: getFullPosterPath(movie.poster_path),
    };

    return (
      <div
        key={movie.id}
        onClick={() => {
          clickHandler(movie.id);
        }}
      >
        <CardMovie movie={movieWithFullPosterPath} />
      </div>
    );
  });

  return <>{listMovies}</>;
};

const NothingFound = (): JSX.Element => (
  <>
    <h3>Nothing found</h3>
  </>
);

export const MovieCards = ({ movies, clickHandler }: MovieCardsProps) => {
  return (
    <div className="cards-wrapper">
      {movies.length === 0 ? (
        <NothingFound />
      ) : (
        <MovieList movies={movies} clickHandler={clickHandler} />
      )}
    </div>
  );
};
