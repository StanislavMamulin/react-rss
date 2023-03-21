import { PureComponent, ReactNode } from 'react';
import './CreatePage.scss';

export class CreatePage extends PureComponent {
  render(): ReactNode {
    return (
      <div className="create-page__container">
        <h1>Create your own fantasy world</h1>
      </div>
    );
  }
}
