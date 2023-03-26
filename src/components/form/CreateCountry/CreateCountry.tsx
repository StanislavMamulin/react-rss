import { PureComponent, ReactNode, FormEvent, RefObject, createRef } from 'react';
import { ContinentChooser } from './Fields/Continent';

import { LandLocked } from './Fields/LandLocked';
import { UploadFlag } from './Fields/UploadFlag';
import { SelectWeekStart } from './Fields/WeekStart';

import { CountryName } from './Fields/CountryName';
import { Capital } from './Fields/Capital';
import { NationalDay } from './Fields/NationalDay';
import { Country } from 'data/Countries.model';

import './CreateCountry.scss';

type CreateCountryProps = {
  addCardHandler: (countries: Country) => void;
};

export class CreateCountry extends PureComponent<CreateCountryProps> {
  fieldsRefs: RefObject<
    | CountryName
    | LandLocked
    | Capital
    | NationalDay
    | ContinentChooser
    | SelectWeekStart
    | UploadFlag
  >[] = [];

  countryNameComponent: RefObject<CountryName> = createRef();
  capitalComponent: RefObject<Capital> = createRef();
  nationalDayComponent: RefObject<NationalDay> = createRef();
  landlockedComponent: RefObject<LandLocked> = createRef();
  continentComponent: RefObject<ContinentChooser> = createRef();
  weekStartComponent: RefObject<SelectWeekStart> = createRef();
  flagUploadComponent: RefObject<UploadFlag> = createRef();

  constructor(props: CreateCountryProps) {
    super(props);

    this.fieldsRefs.push(this.countryNameComponent);
    this.fieldsRefs.push(this.capitalComponent);
    this.fieldsRefs.push(this.landlockedComponent);
    this.fieldsRefs.push(this.nationalDayComponent);
    this.fieldsRefs.push(this.continentComponent);
    this.fieldsRefs.push(this.weekStartComponent);
    this.fieldsRefs.push(this.flagUploadComponent);
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.fieldsRefs.forEach((fieldRef) => {
      fieldRef.current?.validate();
    });
    const allOk = this.fieldsRefs.every((fieldRef) => fieldRef.current?.validate());

    const form = event.target as HTMLFormElement;

    if (allOk) {
      this.props.addCardHandler({
        name: {
          common: this.countryNameComponent.current?.getValue(),
        },
        capital: [this.capitalComponent.current?.getValue()],
        nationalDay: this.nationalDayComponent.current?.getValue(),
        startOfWeek: this.weekStartComponent.current?.getValue(),
        continents: this.continentComponent.current?.getValue(),
        landlocked: this.landlockedComponent.current?.getValue(),
        flags: {
          png: this.flagUploadComponent.current?.getValue(),
        },
      });
      form.reset();
    }
  };

  render(): ReactNode {
    return (
      <div className="create__container">
        <form className="create__form" onSubmit={this.handleSubmit}>
          <CountryName ref={this.countryNameComponent} />
          <Capital ref={this.capitalComponent} />
          <NationalDay ref={this.nationalDayComponent} />
          <SelectWeekStart ref={this.weekStartComponent} />
          <ContinentChooser ref={this.continentComponent} />
          <LandLocked ref={this.landlockedComponent} />
          <UploadFlag ref={this.flagUploadComponent} />

          <input type="submit" value="Create" className="create__submit" />
        </form>
      </div>
    );
  }
}
