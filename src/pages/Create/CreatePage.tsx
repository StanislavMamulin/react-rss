import { CreateCountry } from '../../components/form/CreateCountry/CreateCountry';
import { PureComponent, ReactNode } from 'react';
import { Country } from 'data/Countries.model';
import { CardsList } from '../../components/ui/Cards/Cards';

import './CreatePage.scss';

type CreatePageProps = Record<string, null>;

type CreatePageState = {
  fantasyCountries: Country[];
};

export class CreatePage extends PureComponent<CreatePageProps, CreatePageState> {
  state: CreatePageState = {
    fantasyCountries: [],
  };

  addCardHandler = (country: Country) => {
    this.setState((prevState) => ({
      fantasyCountries: [...prevState.fantasyCountries, country],
    }));
  };

  render(): ReactNode {
    return (
      <div className="create-page__container">
        <h1>Create your own fantasy world</h1>
        <CreateCountry addCardHandler={this.addCardHandler} />
        <div className="cards-wrapper">
          <CardsList countries={this.state.fantasyCountries} />
        </div>
      </div>
    );
  }
}
