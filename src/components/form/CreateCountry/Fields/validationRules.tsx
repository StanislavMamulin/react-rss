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
