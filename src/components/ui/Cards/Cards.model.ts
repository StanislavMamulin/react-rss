import { Country } from 'data/Countries.model';

export type CardsProps = {
  countries: Country[];
  isLoading: boolean;
};

export type CardsListProps = {
  countries: Country[];
};
