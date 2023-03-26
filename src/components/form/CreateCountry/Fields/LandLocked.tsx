import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

import '../CreateCountry.scss';

export class LandLocked extends PureComponent implements Field<boolean> {
  landlockedInput: RefObject<HTMLInputElement> = createRef();
  notLandlockedInput: RefObject<HTMLInputElement> = createRef();

  render(): ReactNode {
    return (
      <div className="create__landlocked-container">
        <Label title="Landlocked:">
          <label className="create__label">
            <input type="radio" name="landlocked" value="yes" ref={this.landlockedInput} />
            Yes
          </label>
          <label className="create__label">
            <input type="radio" name="landlocked" value="no" ref={this.notLandlockedInput} />
            No
          </label>
        </Label>
      </div>
    );
  }

  validate(): boolean {
    return Boolean(
      this.landlockedInput.current?.checked || this.notLandlockedInput.current?.checked
    );
  }

  getValue(): boolean {
    return this.landlockedInput.current!.checked;
  }
}
