import { PureComponent, ReactNode } from 'react';
import './Error404Page.scss';

export class Error404Page extends PureComponent {
  render(): ReactNode {
    return (
      <div className="error-page__container">
        <img className="error-page__image" src="/images/404-error.png" alt="Page not found" />
      </div>
    );
  }
}
