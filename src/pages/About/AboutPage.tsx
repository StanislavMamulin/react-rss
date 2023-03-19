import { PureComponent, ReactNode } from 'react';
import './AboutPage.scss';

export class AboutPage extends PureComponent {
  render(): ReactNode {
    return (
      <div className="about-page__container">
        <h1>About Us</h1>
        <p className="about-page__description">
          We are the best and, as they say, Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Ullam a eligendi esse illum nostrum eaque iusto? Illum vel reiciendis, pariatur
          nihil esse dolores nisi dignissimos facilis nemo iusto, aperiam tempora?
        </p>
      </div>
    );
  }
}
