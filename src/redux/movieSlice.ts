import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MoviesState {
  searchMovieName: string;
}

const initialState: MoviesState = {
  searchMovieName: '',
};

export const MoviesSlice = createSlice({
  name: 'Movies',
  initialState,
  reducers: {
    setSearchMovie: (state, action: PayloadAction<string>) => {
      state.searchMovieName = action.payload;
    },
  },
});

export const { setSearchMovie } = MoviesSlice.actions;

export default MoviesSlice.reducer;
