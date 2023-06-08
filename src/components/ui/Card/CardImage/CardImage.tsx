import { Component } from 'react';
import { CardImageProps } from './CardImage.model';

import './CardImage.scss';

export class CardImage extends Component<CardImageProps> {
  render() {
    const { flagImage } = this.props;

    return (
      <div className="card-image__wrapper">
        <img className="flag-img" src={flagImage} />
      </div>
    );
  }
}
