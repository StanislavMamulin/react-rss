import { FormEvent, RefObject, createRef, useEffect } from 'react';
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
  isCountryExist: (countries: Country) => boolean;
};

export const CreateCountry = ({
  addCardHandler,
  isCountryExist,
}: CreateCountryProps): JSX.Element => {
  const fieldsRefs: RefObject<
    | CountryName
    | LandLocked
    | Capital
    | NationalDay
    | ContinentChooser
    | SelectWeekStart
    | UploadFlag
  >[] = [];

  const countryNameComponent: RefObject<CountryName> = createRef();
  const capitalComponent: RefObject<Capital> = createRef();
  const nationalDayComponent: RefObject<NationalDay> = createRef();
  const landlockedComponent: RefObject<LandLocked> = createRef();
  const continentComponent: RefObject<ContinentChooser> = createRef();
  const weekStartComponent: RefObject<SelectWeekStart> = createRef();
  const flagUploadComponent: RefObject<UploadFlag> = createRef();

  useEffect(() => {
    fieldsRefs.push(countryNameComponent);
    fieldsRefs.push(capitalComponent);
    fieldsRefs.push(landlockedComponent);
    fieldsRefs.push(nationalDayComponent);
    fieldsRefs.push(continentComponent);
    fieldsRefs.push(weekStartComponent);
    fieldsRefs.push(flagUploadComponent);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fieldsRefs.forEach((fieldRef) => {
      fieldRef.current?.validate();
    });
    const allOk = fieldsRefs.every((fieldRef) => fieldRef.current?.validate());

    const form = event.target as HTMLFormElement;

    if (allOk) {
      const newCountry = {
        name: {
          common: countryNameComponent.current?.getValue(),
        },
        capital: [capitalComponent.current?.getValue()],
        nationalDay: nationalDayComponent.current?.getValue(),
        startOfWeek: weekStartComponent.current?.getValue(),
        continents: continentComponent.current?.getValue(),
        landlocked: landlockedComponent.current?.getValue(),
        flags: {
          png: flagUploadComponent.current?.getValue(),
        },
      };

      if (isCountryExist(newCountry)) {
        return;
      }

      addCardHandler(newCountry);
      form.reset();
      continentComponent.current?.clear();
    }
  };

  return (
    <div className="create__container">
      <form className="create__form" onSubmit={handleSubmit}>
        <CountryName ref={countryNameComponent} />
        <Capital ref={capitalComponent} />
        <NationalDay ref={nationalDayComponent} />
        <SelectWeekStart ref={weekStartComponent} />
        <ContinentChooser ref={continentComponent} />
        <LandLocked ref={landlockedComponent} />
        <UploadFlag ref={flagUploadComponent} />

        <input type="submit" value="Create" className="create__submit" />
      </form>
    </div>
  );
};
