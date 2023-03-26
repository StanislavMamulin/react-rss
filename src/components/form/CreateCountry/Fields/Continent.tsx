import { createRef, PureComponent, ReactNode, RefObject, SyntheticEvent } from 'react';
import { Label } from './Label';

import '../CreateCountry.scss';
import { Field } from './fields.model';

const continents = ['Kagaria', 'Hazos', 'Abora', 'Khuntan'];

type ContinentProps = {
  ref: RefObject<ContinentChooser>;
};

type ContinentState = {
  errorMessage: string;
};

export class ContinentChooser
  extends PureComponent<ContinentProps, ContinentState>
  implements Field<string[]>
{
  state = {
    errorMessage: '',
  };
  choosenContinents: string[] = [];

  checkHandler = (event: SyntheticEvent) => {
    if (!event.nativeEvent.target) return;

    const checkedValue = (event.nativeEvent.target as HTMLInputElement).value;

    const existContinentIndex: number = this.choosenContinents.findIndex(
      (continent: string) => continent === checkedValue
    );

    if (existContinentIndex === -1) {
      this.choosenContinents.push(checkedValue);
      this.choosenContinents.sort();
    } else {
      this.choosenContinents.splice(existContinentIndex, 1);
    }
  };

  render(): ReactNode {
    return (
      <div className="create__continents-container">
        <p>Located on the continents:</p>
        {continents.map((continent: string) => (
          <Label title={continent} key={continent}>
            <input
              type="checkbox"
              name={`continent-${continent}`}
              className="create__checkbox"
              value={continent}
              onChange={this.checkHandler}
            />
          </Label>
        ))}
        {this.state.errorMessage ? (
          <p className="create__label-error">{this.state.errorMessage}</p>
        ) : null}
      </div>
    );
  }

  validate = (): boolean => {
    if (this.choosenContinents.length === 0) {
      this.setState({
        errorMessage: 'Please select at least one continent',
      });

      return false;
    }

    this.setState({
      errorMessage: '',
    });

    return true;
  };

  getValue = (): string[] => {
    return this.choosenContinents;
  };

  clear = (): void => {
    this.choosenContinents = [];
  };
}
