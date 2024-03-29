import { CreateCountry } from '../../components/form/CreateCountry/CreateCountry';
import { ReactNode, useState } from 'react';
import { Country } from '../../data/Countries.model';
import { CardsList } from '../../components/ui/Cards/CardsList';

import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addCountry } from '../../redux/createCountrySlice';

import './CreatePage.scss';

const MS_TO_SHOW_SUCCESS_MESSAGE = 2000;

export const CreatePage = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessageShow, setSuccessMessageShow] = useState<boolean>(false);
  const fantasyCountries = useSelector((state: RootState) => state.countries.countries);
  const dispatch = useDispatch();

  const addCardHandler = (country: Country): void => {
    dispatch(addCountry(country));
    setErrorMessage('');
    setSuccessMessageShow(true);

    setTimeout(() => {
      setSuccessMessageShow(false);
    }, MS_TO_SHOW_SUCCESS_MESSAGE);
  };

  const isCountryExist = (country: Country): boolean => {
    if (fantasyCountries.find((countryItem) => countryItem.name?.common === country.name?.common)) {
      setErrorMessage('A country with this name already exists, please introduce a new');
      return true;
    }

    return false;
  };

  const successfullyCreated = (): ReactNode => {
    return (
      <div className="created">
        <p className="created__text">Successfully created!</p>
      </div>
    );
  };

  return (
    <div className="create-page__container">
      {successMessageShow && successfullyCreated()}
      <h1>Create your own fantasy world</h1>
      <img src="/images/Continents.jpg" alt="Continents" className="create-page__continent-image" />
      <CreateCountry addCardHandler={addCardHandler} isCountryExist={isCountryExist} />
      {errorMessage ? <p className="name-error">{errorMessage}</p> : null}
      <div className="cards-wrapper">
        <CardsList countries={fantasyCountries} />
      </div>
    </div>
  );
};
