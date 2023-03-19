import { PureComponent, ReactNode } from 'react';
import './Header.scss';

export class Header extends PureComponent {
  render(): ReactNode {
    return (
      <nav className="header__container">
        <ul className="navbar__list">
          <li className="navbar__item">Main page</li>
          <li className="navbar__item">About Us</li>
        </ul>
      </nav>
    );
  }
}
