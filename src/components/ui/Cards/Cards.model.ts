import { Country } from 'data/Countries.model';
import countries from '../../../data/Countries.json';

export type CardsProps = object;

export type CardsState = {
  countries: Country[];
};

export type CardsListProps = {
  countries: Country[];
};

export const getCountries = () => countries;
