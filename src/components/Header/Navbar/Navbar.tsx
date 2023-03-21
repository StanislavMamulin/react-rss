import { PureComponent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const LINK_CLASS = 'navbar__link';
const ACTIVE_LINK_CLASS = 'navbar__link_active';

export class Navbar extends PureComponent {
  render(): ReactNode {
    return (
      <nav>
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? ACTIVE_LINK_CLASS : LINK_CLASS)}
            >
              All countries
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? ACTIVE_LINK_CLASS : LINK_CLASS)}
            >
              Create your world
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? ACTIVE_LINK_CLASS : LINK_CLASS)}
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
