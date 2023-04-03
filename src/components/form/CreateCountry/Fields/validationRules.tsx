const nameCharacters = new RegExp(/^\p{Lu}[\p{L}\p{Z}\p{Pd}]+[^\p{Z}\p{Pd}]$/gu);

export const capitalValidation = {
  value: nameCharacters,
  message:
    'Must start with a capital letter. Only any letters of any language, hyphen or dash, space or invisible separator are supported.',
};

export const minLengthValidation = (length: number) => ({
  value: length,
  message: `Too short: minimum ${length} characters`,
});

export const fieldIsRequired = 'Field is required';

export const notFuture = (date: Date) => {
  const choosenDate = date.getTime();
  const now = new Date().getTime();

  return choosenDate > now ? 'Date must be today or in the past' : true;
};

export const leastOneAnswerInArray = (array: string[]) =>
  array.length !== 0 || 'At least one must be selected';

export const somethingChoosen = (isChoosen: boolean | undefined) =>
  isChoosen || 'At least one option must be selected';

export const isImageFile = (file: FileList) =>
  file[0].type.includes('image') || 'Incorrect format: must image';
