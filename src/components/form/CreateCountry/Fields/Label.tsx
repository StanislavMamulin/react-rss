import { Component, ReactNode } from 'react';
import '../CreateCountry.scss';

type LabelProps = {
  children: ReactNode;
  title: string;
  vertical?: boolean;
  errorMessage?: string;
};

export class Label extends Component<LabelProps> {
  render() {
    const { children, title, vertical, errorMessage } = this.props;

    return (
      <div className="create__label-container">
        <label className={`create__label ${vertical ? 'create__label_vertical' : ''}`}>
          <p className="create__label-title">{title}</p>
          {children}
        </label>
        {errorMessage ? <p className="create__label-error">{errorMessage}</p> : null}
      </div>
    );
  }
}
