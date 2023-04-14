import { Modal } from '../../components/Modal/Modal';
import { Loader } from '../../components/ui/Loader/Loader';
import { MovieDetails } from '../../components/ui/MovieDetails/MovieDetails';
import { useGetMovieDetailsQuery } from '../../services/movieAPI';

type DetailsModalProps = {
  onClose: () => void;
  selectedMovieId: number;
};

export const DetailsModal = ({ onClose, selectedMovieId }: DetailsModalProps): JSX.Element => {
  const { data: movieDetails, isLoading, isFetching } = useGetMovieDetailsQuery(selectedMovieId);

  let content: JSX.Element | null = null;

  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (movieDetails) {
    content = <MovieDetails movieDetails={movieDetails} />;
  } else {
    content = <p>Error</p>;
  }

  return <Modal onClose={onClose}>{content}</Modal>;
};
