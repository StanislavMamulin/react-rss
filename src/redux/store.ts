import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import countriesReducer from './createCountrySlice';
import moviesReducer from './movieSlice';
import { movieApi } from '../services/movieAPI';

const rootReducer = combineReducers({
  countries: countriesReducer,
  movies: moviesReducer,
  [movieApi.reducerPath]: movieApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
    preloadedState,
  });

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
