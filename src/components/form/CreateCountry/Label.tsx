import { Component, ReactNode } from 'react';
import './CreateCountry.scss';

type LabelProps = {
  children: ReactNode;
  title: string;
  vertical?: boolean;
};

export class Label extends Component<LabelProps> {
  render() {
    const { children, title, vertical } = this.props;

    return (
      <label className={`create__label ${vertical ? 'create__label_vertical' : ''}`}>
        <p className="create__label-title">{title}</p>
        {children}
      </label>
    );
  }
}
