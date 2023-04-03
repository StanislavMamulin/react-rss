import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { SEARCH_STORE_KEY } from './constants';

import SearchLogo from '../../../assets/icons/search.svg';
import ClearLogo from '../../../assets/icons/clear.svg';

import './SearchBar.scss';

const INITIAL_SEARCH_VALUE = '';

export const SearchBar = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>(INITIAL_SEARCH_VALUE);
  const searchText = useRef(searchValue);

  useEffect(() => {
    const savedSearch: string = localStorage.getItem(SEARCH_STORE_KEY) || INITIAL_SEARCH_VALUE;
    setSearchValue(savedSearch);
    searchText.current = savedSearch;

    return () => {
      localStorage.setItem(SEARCH_STORE_KEY, searchText.current);
    };
  }, []);

  useEffect(() => {
    if (searchValue !== INITIAL_SEARCH_VALUE) {
      searchText.current = searchValue || INITIAL_SEARCH_VALUE;
    }
  }, [searchValue]);

  const inputHandler = (event: BaseSyntheticEvent): void => {
    const searchTextValue: string = event.target.value;

    setSearchValue(searchTextValue);

    if (searchTextValue.length === 0) {
      localStorage.removeItem(SEARCH_STORE_KEY);
      searchText.current = INITIAL_SEARCH_VALUE;
    }
  };

  const clearHandler = (event: BaseSyntheticEvent): void => {
    event.preventDefault();

    setSearchValue(INITIAL_SEARCH_VALUE);
    localStorage.removeItem(SEARCH_STORE_KEY);
    searchText.current = INITIAL_SEARCH_VALUE;
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
      ></input>
      {searchValue.length > 0 && (
        <div role="button" className="search-bar__clear-wrapper" onMouseDown={clearHandler}>
          <img src={ClearLogo} alt="Clear search" className="search-bar__clear-icon" />
        </div>
      )}
    </div>
  );
};
