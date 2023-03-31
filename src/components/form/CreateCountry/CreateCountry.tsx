import { FormEvent, RefObject, createRef, useEffect, useRef, useState } from 'react';
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
  const [fieldsRefs, setFieldsRefs] = useState<
    RefObject<
      | CountryName
      | LandLocked
      | Capital
      | NationalDay
      | ContinentChooser
      | SelectWeekStart
      | UploadFlag
    >[]
  >([]);

  const countryNameComponent: RefObject<CountryName> = useRef(null);
  const capitalComponent: RefObject<Capital> = useRef(null);
  const nationalDayComponent: RefObject<NationalDay> = useRef(null);
  const landlockedComponent: RefObject<LandLocked> = useRef(null);
  const continentComponent: RefObject<ContinentChooser> = useRef(null);
  const weekStartComponent: RefObject<SelectWeekStart> = useRef(null);
  const flagUploadComponent: RefObject<UploadFlag> = useRef(null);

  useEffect(() => {
    setFieldsRefs([
      countryNameComponent,
      capitalComponent,
      landlockedComponent,
      nationalDayComponent,
      continentComponent,
      weekStartComponent,
      flagUploadComponent,
    ]);
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
