import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { Cards } from '../../components/ui/Cards/Cards';
import { useEffect, useState } from 'react';
import { Country } from '../../data/Countries.model';
import { getAllCountries, searchCountriesByName } from '../../components/ui/Cards/Cards.model';
import './MainPage.scss';

export const MainPage = (): JSX.Element => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');

  const requestCountries = async (controller: AbortController, searchText?: string) => {
    try {
      let countries: Country[];
      if (searchText) {
        countries = await searchCountriesByName(searchText, controller);
      } else {
        countries = await getAllCountries(controller);
      }
      setCountries(countries);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    requestCountries(controller);

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    requestCountries(controller, searchValue);

    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [searchValue]);

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
