import { Country } from 'data/Countries.model';
import { CardProps } from './Card.model';
import { CardImage } from './CardImage/CardImage';
import './Card.scss';
import { CardInfo } from './CardInfo/CardInfo';

export const Card = ({ country }: CardProps) => {
  const { flag, flags, ...countryInfo }: Country = country;

  return (
    <div className="card-wrapper">
      <CardImage flagEmoji={flag} flagImage={flags?.png} />
      <CardInfo countryInfo={countryInfo} />
    </div>
  );
};
