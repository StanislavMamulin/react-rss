import { useEffect, useState } from 'react';
import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';
import { fieldIsRequired, notFuture } from './validationRules';

const FIELD_NAME = 'nationalDay';

export const NationalDay = ({ register, errors }: ReactHookFormFieldProps): JSX.Element => {
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
    <Label title="National day:" errorMessage={errorMessage}>
      <input
        type="date"
        className="create__date"
        {...register(FIELD_NAME, {
          required: fieldIsRequired,
          valueAsDate: true,
          validate: notFuture,
        })}
      />
    </Label>
  );
};
