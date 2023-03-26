import { CreateCountry } from '../../components/form/CreateCountry/CreateCountry';
import { PureComponent, ReactNode } from 'react';
import { Country } from 'data/Countries.model';
import { CardsList } from '../../components/ui/Cards/Cards';
import ContinentsImage from '../../assets/images/Continents.png';

import './CreatePage.scss';

type CreatePageProps = Record<string, null>;

type CreatePageState = {
  fantasyCountries: Country[];
  errorMessage: string;
};

export class CreatePage extends PureComponent<CreatePageProps, CreatePageState> {
  state: CreatePageState = {
    fantasyCountries: [],
    errorMessage: '',
  };

  addCardHandler = (country: Country) => {
    this.setState((prevState) => ({
      fantasyCountries: [...prevState.fantasyCountries, country],
      errorMessage: '',
    }));
  };

  isCountryExist = (country: Country): boolean => {
    if (
      this.state.fantasyCountries.find(
        (countryItem) => countryItem.name?.common === country.name?.common
      )
    ) {
      this.setState({
        errorMessage: 'A country with this name already exists, please introduce a new',
      });
      return true;
    }

    return false;
  };

  render(): ReactNode {
    return (
      <div className="create-page__container">
        <h1>Create your own fantasy world</h1>
        <img src={ContinentsImage} className="create-page__continent-image" />
        <CreateCountry addCardHandler={this.addCardHandler} isCountryExist={this.isCountryExist} />
        <div className="cards-wrapper">
          <CardsList countries={this.state.fantasyCountries} />
        </div>
        {this.state.errorMessage ? <p className="name-error">{this.state.errorMessage}</p> : null}
      </div>
    );
  }
}
