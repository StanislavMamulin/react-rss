import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

type NationalDayProps = {
  ref: RefObject<NationalDay>;
};

type NationalDayState = {
  errorMessage: string;
};

export class NationalDay
  extends PureComponent<NationalDayProps, NationalDayState>
  implements Field<string>
{
  nationalDayInput: RefObject<HTMLInputElement> = createRef();
  state = {
    errorMessage: '',
  };

  render(): ReactNode {
    return (
      <Label title="National day:" errorMessage={this.state.errorMessage}>
        <input
          type="date"
          name="national-day"
          className="create__date"
          ref={this.nationalDayInput}
        />
      </Label>
    );
  }

  validate(): boolean {
    if (!this.nationalDayInput.current) {
      return false;
    }

    const dateValue: string = this.nationalDayInput.current.value;
    if (dateValue === '') {
      this.setState({
        errorMessage: 'Please enter date',
      });
      return false;
    }

    const date: Date = new Date(dateValue);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date > tomorrow) {
      this.setState({
        errorMessage: 'Date must be today or in the past',
      });
      return false;
    }

    this.setState({
      errorMessage: '',
    });
    return true;
  }

  getValue(): string {
    const dateValue: string = this.nationalDayInput.current!.value;
    return dateValue;
  }
}
