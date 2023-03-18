import { Component } from 'react';
import { CardInfoProps, CommonInfoProps } from './CardInfo.model';
import { getAllInfoObjectValues, InfoProp } from '../../../../utilities/helpers';
import './CardInfo.scss';

export class CardInfo extends Component<CardInfoProps> {
  render() {
    const {
      name,
      capital,
      continents,
      region,
      subregion,
      timezones,
      area,
      population,
      languages,
      currencies,
      maps,
    } = this.props.countryInfo;

    return (
      <div className="card-info__wrapper">
        <CommonInfo infoTitle="Country name" info={name?.common} />
        <CommonInfo infoTitle="Capital" info={capital} />
        <CommonInfo infoTitle="Timezone" info={timezones} />
        <CommonInfo infoTitle="Continents" info={continents} />
        <CommonInfo infoTitle="Region" info={region} />
        <CommonInfo infoTitle="Subregion" info={subregion} />
        <CommonInfo infoTitle="Area" info={area} />
        <CommonInfo infoTitle="Population" info={population} />
        <CommonInfo infoTitle="Languages" info={languages} />
        <CommonInfo infoTitle="Currencies" info={currencies} />
        <CommonInfo infoTitle="Map links" info={maps} />
      </div>
    );
  }
}

class CommonInfo extends Component<CommonInfoProps> {
  render() {
    const { infoTitle, info } = this.props;

    if (!info) {
      return null;
    }

    let infoValue;
    if (Array.isArray(info)) {
      infoValue = Array.isArray(info) ? info.join(', ') : String(info);
    } else if (typeof info === 'object') {
      infoValue = getAllInfoObjectValues(info as InfoProp);
    } else {
      infoValue = info;
    }

    return (
      <div className="info__wrapper">
        <p className="info__title">{infoTitle}:</p>
        <p className="info__detail">{infoValue}</p>
      </div>
    );
  }
}
