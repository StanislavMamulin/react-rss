import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ContinentChooser } from './Fields/Continent';

import { LandLocked } from './Fields/LandLocked';
import { UploadFlag } from './Fields/UploadFlag';
import { SelectWeekStart } from './Fields/WeekStart';

import { CountryName } from './Fields/CountryName';
import { Capital } from './Fields/Capital';
import { NationalDay } from './Fields/NationalDay';
import { Country } from 'data/Countries.model';

import './CreateCountry.scss';
import { FormValues } from './Fields/fields.model';

type CreateCountryProps = {
  addCardHandler: (countries: Country) => void;
  isCountryExist: (countries: Country) => boolean;
};

export const CreateCountry = ({
  addCardHandler,
  isCountryExist,
}: CreateCountryProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>();

  const [clearFields, setClearFields] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (clearFields) {
      setClearFields(false);
    }
  }, [clearFields]);

  const onSubmitHandle: SubmitHandler<FormValues> = (data) => {
    const { coutryName, capital, nationalDay, startOfWeek, continents, landlocked, flagFile } =
      data;

    const newCountry: Country = {
      name: {
        common: coutryName,
      },
      capital: [capital],
      nationalDay: nationalDay.toLocaleDateString(),
      startOfWeek,
      continents,
      landlocked: landlocked === 'yes',
      flags: {
        png: URL.createObjectURL(flagFile[0]),
      },
    };

    if (isCountryExist(newCountry)) {
      return;
    }

    addCardHandler(newCountry);
    setClearFields(true);
  };

  return (
    <div className="create__container">
      <form className="create__form" onSubmit={handleSubmit(onSubmitHandle)}>
        <CountryName register={register} errors={errors} />
        <Capital register={register} errors={errors} />
        <NationalDay register={register} errors={errors} />
        <SelectWeekStart register={register} errors={errors} />
        <ContinentChooser register={register} errors={errors} clear={clearFields} />
        <LandLocked register={register} errors={errors} clear={clearFields} />
        <UploadFlag register={register} errors={errors} />

        <input type="submit" value="Create" className="create__submit" />
      </form>
    </div>
  );
};
