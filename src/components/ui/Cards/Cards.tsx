import { Card } from '../Card/Card';
import { Country } from 'data/Countries.model';
import { CardsListProps, CardsProps } from './Cards.model';
import './Cards.scss';
import { Loader } from '../Loader/Loader';

export const CardsList = ({ countries }: CardsListProps): JSX.Element => {
  const listCountries: JSX.Element[] = countries.map((countryItem: Country) => (
    <Card country={countryItem} key={countryItem.name!.common} />
  ));

  return <>{listCountries}</>;
};

const NothingFound = (): JSX.Element => (
  <>
    <h3>Nothing found</h3>
  </>
);

export const Cards = ({ countries, isLoading }: CardsProps) => {
  return (
    <div className="cards-wrapper">
      {countries.length === 0 ? <NothingFound /> : <CardsList countries={countries} />}
      {isLoading && <Loader />}
    </div>
  );
};
