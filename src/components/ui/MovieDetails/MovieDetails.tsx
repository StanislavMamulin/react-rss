import { MovieDetails as MovieDetailsType } from '../../../data/Movies.model';
import { getFullBackdropPath, getGenresList } from '../../../utilities/movies';
import './MovieDetails.scss';

type ShowedMovieDetails = Pick<
  MovieDetailsType,
  | 'backdrop_path'
  | 'genres'
  | 'original_title'
  | 'overview'
  | 'release_date'
  | 'status'
  | 'tagline'
  | 'vote_average'
>;

type MovieDetailsProps = {
  movieDetails: ShowedMovieDetails;
  onClose?: () => void;
};

export const MovieDetails = ({ movieDetails, onClose }: MovieDetailsProps) => {
  const {
    backdrop_path,
    genres,
    original_title,
    overview,
    release_date,
    status,
    tagline,
    vote_average,
  } = movieDetails;

  const getBackgroundStyle = () => {
    if (backdrop_path) {
      const backgroundImagePath = getFullBackdropPath(backdrop_path);
      return { backgroundImage: `url(${backgroundImagePath})` };
    }
  };

  return (
    <div className="details__wrapper" style={getBackgroundStyle()}>
      <div className="details__content">
        <h2>{original_title}</h2>
        <div className="details__common-container">
          <DetailText title="Release date: " text={release_date} />
          <DetailText title="Score: " text={vote_average.toFixed(1).toString()} />
          <DetailText title="Status: " text={status} />
        </div>
        <DetailText title="Genres: " text={getGenresList(genres)} />
        <DetailText title="Tagline: " text={tagline} />
        <DetailText title="Overview: " text={overview} />
      </div>
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          <span className="close__inner-text">✖</span>
        </button>
      )}
    </div>
  );
};

const DetailText = ({ title, text }: { title: string; text: string | undefined }) => {
  if (!text) return null;
  return (
    <div className="details__info-container">
      <span className="details__title">{title}</span>
      {text}
    </div>
  );
};
