import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';

import '../CreateCountry.scss';

enum WeekStart {
  monday = 'Monday',
  sunday = 'Sunday',
}

const FIELD_NAME = 'startOfWeek';

export const SelectWeekStart = ({ register }: ReactHookFormFieldProps): JSX.Element => (
  <Label title="Start of week:">
    <select {...register(FIELD_NAME)}>
      <option value={WeekStart.monday}>{WeekStart.monday}</option>
      <option value={WeekStart.sunday}>{WeekStart.sunday}</option>
    </select>
  </Label>
);
