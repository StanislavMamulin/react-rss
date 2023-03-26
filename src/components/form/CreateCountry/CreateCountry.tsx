import { PureComponent, ReactNode, SyntheticEvent } from 'react';
import { ContinentChooser } from './Continent';

import { LandLocked } from './Fields/LandLocked';
import { UploadFlag } from './Fields/UploadFlag';
import { SelectWeekStart } from './Fields/WeekStart';

import { CountryName } from './Fields/CountryName';
import { Capital } from './Fields/Capital';
import { NationalDay } from './Fields/NationalDay';

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
          <CountryName />
          <Capital />
          <NationalDay />
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
