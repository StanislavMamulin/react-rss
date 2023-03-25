export interface Field<T> {
  validate: () => boolean;
  getValue: () => T;
}
