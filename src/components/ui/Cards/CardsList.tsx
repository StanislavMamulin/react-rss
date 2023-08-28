import { Card } from '../Card/Card';
import { Country } from '../../../data/Countries.model';
import { CardsListProps } from './Cards.model';

export const CardsList = ({ countries }: CardsListProps): JSX.Element => {
  const listCountries: JSX.Element[] = countries.map((countryItem: Country) => (
    <Card country={countryItem} key={countryItem.name!.common} />
  ));

  return <>{listCountries}</>;
};
