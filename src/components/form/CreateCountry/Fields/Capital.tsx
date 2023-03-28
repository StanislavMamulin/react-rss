import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

type CapitalProps = {
  ref: RefObject<Capital>;
};

type CapitalState = {
  errorMessage: string;
};

export class Capital extends PureComponent<CapitalProps, CapitalState> implements Field<string> {
  capitalInput: RefObject<HTMLInputElement> = createRef();
  state = {
    errorMessage: '',
  };

  render(): ReactNode {
    return (
      <Label title="Capital:" errorMessage={this.state.errorMessage}>
        <input type="text" name="capital" className="create__input" ref={this.capitalInput} />
      </Label>
    );
  }

  validate(): boolean {
    if (!this.capitalInput.current) {
      return false;
    }

    const name: string = this.capitalInput.current.value;
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
    if (!this.capitalInput.current) {
      return '';
    }

    return this.capitalInput.current.value;
  }
}
