import { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { Label } from './Label';
import { Field } from './fields.model';

import '../CreateCountry.scss';

type UploadFlagProps = {
  ref: RefObject<UploadFlag>;
};

type UploadFlagState = {
  errorMessage: string;
};

export class UploadFlag
  extends PureComponent<UploadFlagProps, UploadFlagState>
  implements Field<string>
{
  uploadInput = createRef<HTMLInputElement>();
  state = {
    errorMessage: '',
  };

  render(): ReactNode {
    return (
      <Label title="Choose a country flag image:" vertical errorMessage={this.state.errorMessage}>
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
    if (!this.uploadInput.current || !this.uploadInput.current.files) {
      this.setState({
        errorMessage: 'Please choose flag image',
      });
      return false;
    }

    const isFileChosen = this.uploadInput.current.files.length > 0;

    if (!isFileChosen) {
      this.setState({
        errorMessage: 'Please choose flag image',
      });
      return false;
    }

    const file = this.uploadInput.current.files[0];

    if (!file.type.match('image/*')) {
      this.setState({
        errorMessage: 'Incorrect format. Should be an image.',
      });
      return false;
    }

    this.setState({
      errorMessage: '',
    });
    return true;
  };

  getValue = (): string => {
    const flagImages = this.uploadInput.current?.files;
    if (flagImages) {
      return URL.createObjectURL(flagImages[0]);
    }

    return '';
  };
}
