import { Country } from 'data/Countries.model';

export type CardsProps = {
  countries: Country[];
  isLoading: boolean;
};

export type CardsListProps = {
  countries: Country[];
};

const BASE_URL = 'https://restcountries.com/v3.1';
const ALL_COUNTRIES_URL = `${BASE_URL}/all`;
const NECESSARY_FIELDS =
  '?fields=name,flags,capital,continents,region,subregion,timezones,area,population,languages,currencies,maps,landlocked,startOfWeek';

export const getAllCountries = async (controller: AbortController): Promise<Country[]> => {
  try {
    const response = await fetch(`${ALL_COUNTRIES_URL}${NECESSARY_FIELDS}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const allCountries: Country[] = await response.json();

    return allCountries;
  } catch (err) {
    throw err;
  }
};

export const searchCountriesByName = async (
  countryName: string,
  controller: AbortController
): Promise<Country[]> => {
  const searchByNameURL = `${BASE_URL}/name/${countryName}${NECESSARY_FIELDS}`;
  try {
    const response = await fetch(searchByNameURL, { signal: controller.signal });
    if (!response.ok) {
      return [];
    }

    const allCountries: Country[] = await response.json();

    return allCountries;
  } catch (err) {
    throw err;
  }
};
