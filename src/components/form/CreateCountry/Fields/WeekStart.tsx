import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';

import '../CreateCountry.scss';
import { selectedNotDefaultSelect } from './validationRules';

enum WeekStart {
  monday = 'Monday',
  sunday = 'Sunday',
  unchosen = 'Please select day',
}

const FIELD_NAME = 'startOfWeek';

export const SelectWeekStart = ({ register, errors }: ReactHookFormFieldProps): JSX.Element => (
  <Label title="Start of week:" errorMessage={errors[FIELD_NAME]?.message?.toString()}>
    <select
      {...register(FIELD_NAME, {
        validate: (selectedValue) => selectedNotDefaultSelect(selectedValue, WeekStart.unchosen),
      })}
      defaultValue={WeekStart.unchosen}
    >
      <option value={WeekStart.unchosen} disabled>
        {WeekStart.unchosen}
      </option>
      <option value={WeekStart.monday}>{WeekStart.monday}</option>
      <option value={WeekStart.sunday}>{WeekStart.sunday}</option>
    </select>
  </Label>
);
