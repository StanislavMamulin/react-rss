import { useRef } from 'react';
import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';

import '../CreateCountry.scss';
import { somethingChoosen } from './validationRules';

const FIELD_NAME = 'landlocked';

export const LandLocked = ({ register, errors }: ReactHookFormFieldProps) => {
  const isChoosen = useRef<boolean>();
  const isError = errors[FIELD_NAME];

  const onChange = () => {
    isChoosen.current = true;
  };

  return (
    <div className="create__landlocked-container">
      <Label title="Landlocked:" errorMessage={isError?.message?.toString()}>
        <label className="create__label">
          <input
            type="radio"
            value="yes"
            {...register(FIELD_NAME, {
              validate: () => somethingChoosen(isChoosen.current),
              onChange: onChange,
            })}
          />
          Yes
        </label>
        <label className="create__label">
          <input
            type="radio"
            value="no"
            {...register(FIELD_NAME, {
              validate: () => somethingChoosen(isChoosen.current),
              onChange: onChange,
            })}
          />
          No
        </label>
      </Label>
    </div>
  );
};
