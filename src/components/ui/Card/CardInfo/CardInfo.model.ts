import { Country } from '../../../../data/Countries.model';

export type CardInfoProps = {
  countryInfo: Country;
};

export type CommonInfoProps = {
  infoTitle: string;
  info: Country[keyof Country];
};
