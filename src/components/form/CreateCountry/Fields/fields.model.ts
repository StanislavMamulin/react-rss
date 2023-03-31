import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export type ReactHookFormFieldProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export interface Field<T> {
  validate: () => boolean;
  getValue: () => T;
}
