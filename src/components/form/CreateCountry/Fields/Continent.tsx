import { SyntheticEvent, useRef } from 'react';
import { Label } from './Label';
import { ReactHookFormFieldProps } from './fields.model';

import '../CreateCountry.scss';
import { leastOneAnswerInArray } from './validationRules';

const continents = ['Kagaria', 'Hazos', 'Abora', 'Khuntan'];
const FIELD_NAME = 'continents';

export const ContinentChooser = ({ register, errors }: ReactHookFormFieldProps): JSX.Element => {
  const choosenContinents = useRef<string[]>([]);

  const isError = errors[FIELD_NAME];

  const checkHandler = (event: SyntheticEvent) => {
    if (!event.nativeEvent.target || !(event.nativeEvent.target instanceof HTMLInputElement))
      return;

    const checkedValue: string = event.nativeEvent.target.value;

    const existContinentIndex: number = choosenContinents.current.findIndex(
      (continent: string) => continent === checkedValue
    );

    if (existContinentIndex === -1) {
      choosenContinents.current.push(checkedValue);
      choosenContinents.current.sort();
    } else {
      choosenContinents.current.splice(existContinentIndex, 1);
    }
  };

  return (
    <div className="create__continents-container">
      <p>Located on the continents:</p>
      {continents.map((continent: string) => (
        <Label title={continent} key={continent}>
          <input
            type="checkbox"
            {...register(FIELD_NAME, {
              validate: () => {
                return leastOneAnswerInArray(choosenContinents.current);
              },
            })}
            value={continent}
            className="create__checkbox"
            onChange={checkHandler}
            defaultChecked={false}
          />
        </Label>
      ))}
      {isError && <p className="create__label-error">{isError.message?.toString()}</p>}
    </div>
  );
};
