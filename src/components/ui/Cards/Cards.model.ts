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

export const getAllCountries = async (controller: AbortController): Promise<Country[]> => {
  try {
    const response = await fetch(ALL_COUNTRIES_URL, { signal: controller.signal });
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
  const searchByNameURL = `${BASE_URL}/name/${countryName}`;
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
