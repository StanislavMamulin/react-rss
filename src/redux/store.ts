import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import countriesReducer from './createCountrySlice';
import moviesReducer from './movieSlice';
import { movieApi } from '../services/movieAPI';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    movies: moviesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
