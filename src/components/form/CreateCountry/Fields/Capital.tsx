import { useEffect, useState } from 'react';

import { Label } from './Label';
import { capitalValidation, fieldIsRequired, minLengthValidation } from './validationRules';
import { ReactHookFormFieldProps } from './fields.model';

const FIELD_NAME = 'capital';

export const Capital = ({ register, errors }: ReactHookFormFieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isError = errors[FIELD_NAME]?.message;
  useEffect(() => {
    if (!isError) {
      setErrorMessage('');
    } else {
      setErrorMessage(isError as string);
    }
  }, [isError]);

  return (
    <Label title="Capital:" errorMessage={errorMessage}>
      <input
        type="text"
        className="create__input"
        {...register(FIELD_NAME, {
          required: fieldIsRequired,
          minLength: minLengthValidation(2),
          pattern: capitalValidation,
        })}
      />
    </Label>
  );
};
