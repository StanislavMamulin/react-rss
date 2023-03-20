import { PureComponent, ReactNode } from 'react';
import './Header.scss';
import { Navbar } from './Navbar/Navbar';

export class Header extends PureComponent {
  render(): ReactNode {
    return (
      <div className="header__container">
        <Navbar />
      </div>
    );
  }
}
