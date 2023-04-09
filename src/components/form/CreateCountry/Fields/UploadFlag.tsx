import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';

import '../CreateCountry.scss';
import { fieldIsRequired, isImageFile } from './validationRules';

const FIELD_NAME = 'flagFile';

export const UploadFlag = ({ register, errors }: ReactHookFormFieldProps): JSX.Element => {
  const isError = errors[FIELD_NAME];

  return (
    <Label
      title="Choose a country flag image:"
      vertical
      errorMessage={isError?.message?.toString()}
    >
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="flag-upload__input"
        {...register(FIELD_NAME, {
          required: fieldIsRequired,
          validate: isImageFile,
        })}
      ></input>
    </Label>
  );
};
