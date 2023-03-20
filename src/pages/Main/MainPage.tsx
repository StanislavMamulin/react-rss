import { SearchBar } from '../../components/ui/SearchBar/SearchBar';
import { Cards } from '../../components/ui/Cards/Cards';
import { PureComponent, ReactNode } from 'react';
import './MainPage.scss';

export class MainPage extends PureComponent {
  render(): ReactNode {
    return (
      <div className="main-page__container">
        <SearchBar />
        <Cards />
      </div>
    );
  }
}
