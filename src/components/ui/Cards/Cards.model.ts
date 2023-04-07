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
const SHORT_INFO_FIELDS = '?fields=name,flags,capital';
const FULL_INFO_FIELDS =
  '?fields=name,flags,capital,continents,region,subregion,timezones,area,population,languages,currencies,maps,landlocked,startOfWeek';

export const getAllCountries = async (controller: AbortController): Promise<Country[]> => {
  try {
    const response = await fetch(`${ALL_COUNTRIES_URL}${SHORT_INFO_FIELDS}`, {
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
  const searchByNameURL = `${BASE_URL}/name/${countryName}${SHORT_INFO_FIELDS}`;
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

export const getFullInfoByName = async (
  countryName: string,
  controller: AbortController
): Promise<Country | null> => {
  const searchByNameURL = `${BASE_URL}/name/${countryName}${FULL_INFO_FIELDS}&fullName=true`;
  try {
    const response = await fetch(searchByNameURL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error('Data fetch error');
    }

    const country: Country = await response.json();

    return country;
  } catch (err) {
    throw err;
  }
};
