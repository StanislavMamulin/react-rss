import { PureComponent, ReactNode } from 'react';

import './CreateCountry.scss';

export class LandLocked extends PureComponent {
  render(): ReactNode {
    return (
      <div className="create__landlocked-container">
        <p>Landlocked:</p>
        <label className="create__label">
          <input type="radio" name="landlocked-option" value="yes" />
          Yes
        </label>
        <label className="create__label">
          <input type="radio" name="landlocked-option" value="no" />
          No
        </label>
      </div>
    );
  }
}
