import { PureComponent, ReactNode } from 'react';
import Error404 from '../../assets/images/404-error.png';
import './Error404Page.scss';

export class Error404Page extends PureComponent {
  render(): ReactNode {
    return (
      <div className="error-page__container">
        <img className="error-page__image" src={Error404} alt="Page not found" />
      </div>
    );
  }
}
