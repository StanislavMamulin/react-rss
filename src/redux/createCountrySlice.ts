import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Country } from '../data/Countries.model';

export interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<Country>) => {
      state.countries.push(action.payload);
    },
  },
});

export const { addCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
