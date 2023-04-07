import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { Cards } from '../../components/ui/Cards/Cards';
import { useEffect, useState } from 'react';
import { Country } from '../../data/Countries.model';
import { getAllCountries } from '../../components/ui/Cards/Cards.model';
import './MainPage.scss';

export const MainPage = (): JSX.Element => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');

  const requestCountries = async (controller: AbortController) => {
    try {
      const countries: Country[] = await getAllCountries(controller);
      setCountries(countries);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    requestCountries(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const searchHandler = (searchText: string): void => {
    setSearchValue(searchText);
  };

  return (
    <div className="main-page__container">
      <SearchBar searchSubmit={searchHandler} />
      <Cards countries={countries} isLoading={isLoading} />
    </div>
  );
};
