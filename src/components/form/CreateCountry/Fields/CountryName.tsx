import { useEffect, useState } from 'react';
import { Label } from './Label';
import { capitalValidation, fieldIsRequired, minLengthValidation } from './validationRules';
import { ReactHookFormFieldProps } from './fields.model';

const FIELD_NAME = 'coutryName';

export const CountryName = ({ register, errors }: ReactHookFormFieldProps) => {
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
