import { Component } from 'react';
import { CardImageProps } from './CardImage.model';

import './CardImage.scss';

export class CardImage extends Component<CardImageProps> {
  getCardImage = (flag: string | undefined) => (flag ? flag : '🗺️');

  render() {
    const { flagEmoji } = this.props;

    const titleImage = this.getCardImage(flagEmoji);

    return (
      <div className="card-image__wrapper">
        <div className="country__flag">{titleImage}</div>
      </div>
    );
  }
}
