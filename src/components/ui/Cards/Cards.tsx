import { Card } from '../Card/Card';
import { Country } from 'data/Countries.model';
import { PureComponent } from 'react';
import { CardsListProps, CardsProps, CardsState, getCountries } from './Cards.model';
import './Cards.scss';

export class Cards extends PureComponent<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);

    const countries: Country[] = getCountries();
    this.state = {
      countries,
    };
  }

  render() {
    return (
      <div className="cards-wrapper">
        <CardsList countries={this.state.countries} />
      </div>
    );
  }
}

export class CardsList extends PureComponent<CardsListProps> {
  render() {
    const { countries } = this.props;
    const listCountries = countries.map((countryItem: Country) => (
      <Card country={countryItem} key={countryItem.name?.common} />
    ));

    return listCountries;
  }
}
