import { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Label } from './Label';
import { capitalValidation, fieldIsRequired, minLengthValidation } from './validationRules';

type CountryNameProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const FIELD_NAME = 'coutry-name';

export const CountryName = ({ register, errors }: CountryNameProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const isError = errors[FIELD_NAME]?.message;
  useEffect(() => {
    if (!isError) {
      setErrorMessage('');
    } else {
      setErrorMessage(isError as string);
    }
  }, [isError]);

  return (
    <Label title="Country name:" errorMessage={errorMessage}>
      <input
        type="text"
        {...register(FIELD_NAME, {
          required: fieldIsRequired,
          minLength: minLengthValidation(2),
          pattern: capitalValidation,
        })}
        className="create__input"
      />
    </Label>
  );
};
