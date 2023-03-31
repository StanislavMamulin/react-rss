const capitalFirstLetter = new RegExp('^[A-Z][А-Я]*');

export const capitalValidation = {
  value: capitalFirstLetter,
  message: 'The first letter must be capital and alphabetic',
};

export const minLengthValidation = (length: number) => ({
  value: length,
  message: `Too short: minimum ${length} characters`,
});

export const fieldIsRequired = 'Field is required';

export const notFuture = (date: Date) => {
  const choosenDate = date.getTime();
  const now = new Date().getTime();

  return choosenDate > now ? 'Date must be today or in the past' : false;
};
