import { PureComponent, ReactNode } from 'react';
import { Label } from './Label';

import './CreateCountry.scss';

enum WeekStart {
  monday = 'Monday',
  sunday = 'Sunday',
}

export class SelectWeekStart extends PureComponent {
  render(): ReactNode {
    return (
      <Label title="Start of week:">
        <select name="start-of-week">
          <option value={WeekStart.monday}>{WeekStart.monday}</option>
          <option value={WeekStart.sunday}>{WeekStart.sunday}</option>
        </select>
      </Label>
    );
  }
}
