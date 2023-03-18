import { Country } from 'data/Countries.model';
import { Component } from 'react';
import { CardProps } from './Card.model';
import { CardImage } from './CardImage/CardImage';
import './Card.scss';
import { CardInfo } from './CardInfo/CardInfo';

export class Card extends Component<CardProps> {
  render() {
    const { flag, ...countryInfo }: Country = this.props.country;

    return (
      <div className="card-wrapper">
        <CardImage flagEmoji={flag} />
        <CardInfo countryInfo={countryInfo} />
      </div>
    );
  }
}
