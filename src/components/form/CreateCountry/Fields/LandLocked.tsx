import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

import '../CreateCountry.scss';

type LandLockedProps = {
  ref: RefObject<LandLocked>;
};

type LandLockedState = {
  errorMessage: string;
};

export class LandLocked
  extends PureComponent<LandLockedProps, LandLockedState>
  implements Field<boolean>
{
  landlockedInput: RefObject<HTMLInputElement> = createRef();
  notLandlockedInput: RefObject<HTMLInputElement> = createRef();
  state = {
    errorMessage: '',
  };

  render(): ReactNode {
    return (
      <div className="create__landlocked-container">
        <Label title="Landlocked:" errorMessage={this.state.errorMessage}>
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
    const isSomethingSelected = Boolean(
      this.landlockedInput.current?.checked || this.notLandlockedInput.current?.checked
    );

    if (!isSomethingSelected) {
      this.setState({
        errorMessage: 'Please select one of the options',
      });
      return false;
    }

    this.setState({
      errorMessage: '',
    });
    return true;
  }

  getValue(): boolean {
    return this.landlockedInput.current!.checked;
  }
}
