import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

type CountryNameProps = {
  ref: RefObject<CountryName>;
};

type CountryNameState = {
  errorMessage: string;
};

export class CountryName
  extends PureComponent<CountryNameProps, CountryNameState>
  implements Field<string>
{
  countryNameInput: RefObject<HTMLInputElement> = createRef();
  state = {
    errorMessage: '',
  };

  render(): ReactNode {
    return (
      <Label title="Country name:" errorMessage={this.state.errorMessage}>
        <input
          type="text"
          name="coutry-name"
          className="create__input"
          ref={this.countryNameInput}
        />
      </Label>
    );
  }

  validate(): boolean {
    if (!this.countryNameInput.current) {
      return false;
    }

    const name: string = this.countryNameInput.current.value;
    const regExp = new RegExp('^[A-Z][А-Я]*');

    if (name.length < 2) {
      this.setState({
        errorMessage: 'Minimum length 2 characters',
      });
      return false;
    }

    if (!regExp.test(name)) {
      this.setState({
        errorMessage: 'The first letter must be capital and alphabetic',
      });
      return false;
    }

    this.setState({
      errorMessage: '',
    });
    return true;
  }

  getValue(): string {
    if (!this.countryNameInput.current) {
      return '';
    }

    return this.countryNameInput.current.value;
  }
}
