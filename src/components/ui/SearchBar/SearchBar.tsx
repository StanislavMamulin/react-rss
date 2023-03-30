import { BaseSyntheticEvent, useState } from 'react';
import { SEARCH_STORE_KEY } from './constants';

import SearchLogo from '../../../assets/icons/search.svg';
import ClearLogo from '../../../assets/icons/clear.svg';

import './SearchBar.scss';

const INITIAL_SEARCH_VALUE = '';

export const SearchBar = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const savedSearch: string | null = localStorage.getItem(SEARCH_STORE_KEY);
    return savedSearch || INITIAL_SEARCH_VALUE;
  });

  const inputHandler = (event: BaseSyntheticEvent): void => {
    const searchText: string = event.target.value;

    setSearchValue(searchText);
    localStorage.setItem(SEARCH_STORE_KEY, searchText);

    if (searchText.length === 0) {
      localStorage.removeItem(SEARCH_STORE_KEY);
    }
  };

  const clearHandler = (event: BaseSyntheticEvent): void => {
    event.preventDefault();

    setSearchValue(INITIAL_SEARCH_VALUE);
    localStorage.removeItem(SEARCH_STORE_KEY);
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
        <div className="search-bar__clear-wrapper" onMouseDown={clearHandler}>
          <img
            src={ClearLogo}
            alt="Clear search"
            className="search-bar__clear-icon"
            onMouseDown={clearHandler}
          />
        </div>
      )}
    </div>
  );
};
