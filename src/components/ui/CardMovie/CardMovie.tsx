import { MovieMainInfo } from '../../../data/Movies.model';
import './CardMovie.scss';

type CardMovieProps = {
  movie: MovieMainInfo;
};

export const CardMovie = ({ movie }: CardMovieProps) => {
  const { poster_path, title, release_date, vote_average } = movie;

  return (
    <div className="card-wrapper">
      <div className="movie-poster__wrapper">
        <img className="movie-poster__img" src={poster_path} />
      </div>
      <div className="main-info__wrapper">
        <h1 className="main-info__title">{title}</h1>
        <div className="main-info__additional-block">
          <p className="main-info__date">Release: {release_date}</p>
          <p className="main-info__vote">⭐ {vote_average}</p>
        </div>
      </div>
    </div>
  );
};
