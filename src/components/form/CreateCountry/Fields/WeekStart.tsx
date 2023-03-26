import { PureComponent, ReactNode, SyntheticEvent } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

import '../CreateCountry.scss';

enum WeekStart {
  monday = 'Monday',
  sunday = 'Sunday',
}

export class SelectWeekStart extends PureComponent implements Field<string> {
  private weekStartDay = WeekStart.monday;

  dayChangedHandler = (event: SyntheticEvent) => {
    this.weekStartDay = (event.target as HTMLSelectElement).value as WeekStart;
  };

  render(): ReactNode {
    return (
      <Label title="Start of week:">
        <select name="start-of-week" onChange={this.dayChangedHandler}>
          <option value={WeekStart.monday}>{WeekStart.monday}</option>
          <option value={WeekStart.sunday}>{WeekStart.sunday}</option>
        </select>
      </Label>
    );
  }

  validate = (): boolean => {
    return true;
  };

  getValue = (): string => {
    return this.weekStartDay;
  };
}
