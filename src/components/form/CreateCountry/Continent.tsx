import { PureComponent, ReactNode } from 'react';
import { Label } from './Label';

import './CreateCountry.scss';

const continents = ['Kagaria', 'Hazos', 'Abora', 'Khuntan'];

export class ContinentChooser extends PureComponent {
  render(): ReactNode {
    return (
      <div className="create__continents-container">
        <p>Located on the continents:</p>
        {continents.map((continent: string) => (
          <Label title={continent} key={continent}>
            <input type="checkbox" name="continent-option" className="create__checkbox" />
          </Label>
        ))}
      </div>
    );
  }
}
