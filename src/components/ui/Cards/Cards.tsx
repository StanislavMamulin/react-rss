import { Card } from '../Card/Card';
import { Country } from 'data/Countries.model';
import { CardsListProps, CardsProps } from './Cards.model';
import './Cards.scss';

export const CardsList = ({ countries }: CardsListProps): JSX.Element => {
  const listCountries: JSX.Element[] = countries.map((countryItem: Country) => (
    <Card country={countryItem} key={countryItem.name!.common} />
  ));

  return <>{listCountries}</>;
};

export const Cards = ({ countries }: CardsProps) => {
  return (
    <div className="cards-wrapper">
      <CardsList countries={countries} />
    </div>
  );
};
