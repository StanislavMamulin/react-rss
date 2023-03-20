export type InfoProp = {
  [key: string]: string | undefined;
};

export const getAllInfoObjectValues = (obj: InfoProp): string => {
  const values: string[] = [];

  for (const value of Object.values(obj)) {
    if (typeof value === 'object') {
      values.push(getAllInfoObjectValues(value));
    } else {
      if (value) values.push(value);
    }
  }

  return values.join(', ');
};
