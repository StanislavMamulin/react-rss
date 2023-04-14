import { BaseSyntheticEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import SearchLogo from '../../../assets/icons/search.svg';
import ClearLogo from '../../../assets/icons/clear.svg';

import './SearchBar.scss';
import { SearchProps } from './SearchBar.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setSearchMovie } from '../../../redux/movieSlice';

const INITIAL_SEARCH_VALUE = '';

export const SearchBar = ({ searchSubmit }: SearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>(INITIAL_SEARCH_VALUE);
  const searchText = useRef(searchValue);
  const savedSearch = useSelector((state: RootState) => state.movies.searchMovieName);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue(savedSearch);
    searchText.current = savedSearch;
    searchSubmit(savedSearch);

    return () => {
      dispatch(setSearchMovie(searchText.current));
    };
  }, [dispatch, savedSearch, searchSubmit]);

  useEffect(() => {
    if (searchValue !== INITIAL_SEARCH_VALUE) {
      searchText.current = searchValue || INITIAL_SEARCH_VALUE;
    }
  }, [searchValue]);

  const inputHandler = (event: BaseSyntheticEvent): void => {
    const searchTextValue: string = event.target.value;

    setSearchValue(searchTextValue);

    if (searchTextValue.length === 0) {
      searchText.current = INITIAL_SEARCH_VALUE;
    }
  };

  const clearHandler = (event: BaseSyntheticEvent): void => {
    event.preventDefault();

    setSearchValue(INITIAL_SEARCH_VALUE);
    searchText.current = INITIAL_SEARCH_VALUE;
  };

  const onSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      searchSubmit(searchValue);
    }
  };

  return (
    <div className="search-bar__wrapper">
      <img src={SearchLogo} alt="Search" className="search-bar__icon"></img>
      <input
        className="search-bar__input"
        type={'text'}
        onChange={inputHandler}
        placeholder={'Search...'}
        value={searchValue}
        onKeyDown={onSubmit}
      ></input>
      {searchValue.length > 0 && (
        <div role="button" className="search-bar__clear-wrapper" onMouseDown={clearHandler}>
          <img src={ClearLogo} alt="Clear search" className="search-bar__clear-icon" />
        </div>
      )}
    </div>
  );
};
