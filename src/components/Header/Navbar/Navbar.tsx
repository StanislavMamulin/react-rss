import { PureComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

export class Navbar extends PureComponent {
  render(): ReactNode {
    return (
      <nav>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              Main page
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/about" className="navbar__link">
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
