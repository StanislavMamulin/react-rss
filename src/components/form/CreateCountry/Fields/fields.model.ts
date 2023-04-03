import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export type ReactHookFormFieldProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FieldValues>;
  clear?: boolean;
};

export interface Field<T> {
  validate: () => boolean;
  getValue: () => T;
}

export type FormValues = {
  capital: string;
  continents: string[];
  coutryName: string;
  flagFile: FileList;
  landlocked: string;
  nationalDay: Date;
  startOfWeek: string;
};
