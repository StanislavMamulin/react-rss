import { createRef, PureComponent, ReactNode } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

import '../CreateCountry.scss';

export class UploadFlag extends PureComponent implements Field<string> {
  uploadInput = createRef<HTMLInputElement>();

  render(): ReactNode {
    return (
      <Label title="Choose a country flag image:" vertical>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="flag-file"
          className="flag-upload__input"
          ref={this.uploadInput}
        ></input>
      </Label>
    );
  }

  validate = (): boolean => {
    return Boolean(this.uploadInput.current?.files);
  };

  getValue = (): string => {
    const flagImages = this.uploadInput.current?.files;
    if (flagImages) {
      return URL.createObjectURL(flagImages[0]);
    }

    return '';
  };
}
