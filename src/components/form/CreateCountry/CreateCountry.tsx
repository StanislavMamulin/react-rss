import { PureComponent, ReactNode, SyntheticEvent } from 'react';
import { ContinentChooser } from './Continent';

import { Label } from './Label';
import { LandLocked } from './LandLocked';
import { UploadFlag } from './UploadFlag';
import { SelectWeekStart } from './WeekStart';

import './CreateCountry.scss';

export class CreateCountry extends PureComponent {
  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(event);
  };

  render(): ReactNode {
    return (
      <div className="create__container">
        <form className="create__form" onSubmit={this.handleSubmit}>
          <Label title="Country name:">
            <input type="text" name="coutry-name" className="create__input" />
          </Label>
          <Label title="Capital:">
            <input type="text" name="capital" className="create__input" />
          </Label>
          <Label title="Country day:">
            <input type="date" name="country-day" className="create__date" />
          </Label>
          <SelectWeekStart />
          <ContinentChooser />
          <LandLocked />
          <UploadFlag />

          <input type="submit" value="Create" className="create__submit" />
        </form>
      </div>
    );
  }
}
