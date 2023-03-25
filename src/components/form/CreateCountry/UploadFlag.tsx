import { PureComponent, ReactNode } from 'react';
import { Label } from './Label';

import './CreateCountry.scss';

export class UploadFlag extends PureComponent {
  render(): ReactNode {
    return (
      <Label title="Choose a country flag image:" vertical>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="flag-upload"
          className="flag-upload__input"
        ></input>
      </Label>
    );
  }
}
