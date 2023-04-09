import { Card } from '../Card/Card';
import { Country } from 'data/Countries.model';
import { useEffect, useState } from 'react';
import { CardsListProps, getCountries } from './Cards.model';
import './Cards.scss';

export const CardsList = ({ countries }: CardsListProps): JSX.Element => {
  const listCountries: JSX.Element[] = countries.map((countryItem: Country) => (
    <Card country={countryItem} key={countryItem.name!.common} />
  ));

  return <>{listCountries}</>;
};

export const Cards = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const countries: Country[] = getCountries();
    setCountries(countries);
  }, []);

  return (
    <div className="cards-wrapper">
      <CardsList countries={countries} />
    </div>
  );
};
