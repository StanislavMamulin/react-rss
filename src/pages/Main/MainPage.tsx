import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { Cards } from '../../components/ui/Cards/Cards';
import { useEffect, useState } from 'react';
import { Country } from '../../data/Countries.model';
import { getCountries } from '../../components/ui/Cards/Cards.model';
import './MainPage.scss';

export const MainPage = (): JSX.Element => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const countries: Country[] = getCountries();
    setCountries(countries);
  }, []);

  return (
    <div className="main-page__container">
      <SearchBar />
      <Cards countries={countries} />
    </div>
  );
};
