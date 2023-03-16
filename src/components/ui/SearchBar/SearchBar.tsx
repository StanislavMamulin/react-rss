import { BaseSyntheticEvent, Component } from 'react';
import { SEARCH_STORE_KEY } from './constants';
import { SearchProps, SearchState } from './SearchBar.model';

import SearchLogo from '../../../assets/icons/search.svg';
import ClearLogo from '../../../assets/icons/clear.svg';

import './SearchBar.scss';

export class SearchBar extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchValue: '',
  };

  render(): JSX.Element {
    return (
      <div className="search-bar__wrapper">
        <img src={SearchLogo} alt="Search" className="search-bar__icon"></img>
        <input
          className="search-bar__input"
          type={'text'}
          onChange={this.inputHandler}
          placeholder={'Search...'}
          value={this.state.searchValue}
        ></input>
        <div className="search-bar__clear-wrapper" onMouseDown={this.clearHandler}>
          <img
            src={ClearLogo}
            alt="Clear search"
            className="search-bar__clear-icon"
            onMouseDown={this.clearHandler}
          />
        </div>
      </div>
    );
  }

  componentWillUnmount(): void {
    if (this.state.searchValue) {
      localStorage.setItem(SEARCH_STORE_KEY, this.state.searchValue);
    }
  }

  componentDidMount(): void {
    const savedSearch: string | null = localStorage.getItem(SEARCH_STORE_KEY);
    if (savedSearch) {
      this.setState({ searchValue: savedSearch });
    }
  }

  inputHandler = (event: BaseSyntheticEvent): void => {
    const searchText: string = event.target.value;

    this.setState({
      searchValue: searchText,
    });

    if (searchText.length === 0) {
      localStorage.removeItem(SEARCH_STORE_KEY);
    }
  };

  clearHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    this.setState({
      searchValue: '',
    });
    localStorage.removeItem(SEARCH_STORE_KEY);
  };
}
