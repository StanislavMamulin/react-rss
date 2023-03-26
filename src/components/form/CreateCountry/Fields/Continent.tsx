import { PureComponent, ReactNode } from 'react';
import { Label } from './Label';

import './CreateCountry.scss';

const continents = ['Kagaria', 'Hazos', 'Abora', 'Khuntan'];

export class ContinentChooser extends PureComponent {
  render(): ReactNode {
    return (
      <div className="create__continents-container">
        <Label title="Located on the continents:" vertical>
          {continents.map((continent: string) => (
            <Label title={continent} key={continent}>
              <input
                type="checkbox"
                name={`continent-${continent}`}
                className="create__checkbox"
                value={continent}
              />
            </Label>
          ))}
        </Label>
      </div>
    );
  }
}
