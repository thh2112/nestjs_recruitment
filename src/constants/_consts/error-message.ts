export function maxLengthMessage(maxLength: number, textFieldName?: string) {
  return textFieldName
    ? `${textFieldName} must have at most ${maxLength} characters.`
    : `Must have at most ${maxLength} characters.`;
}

export function minLengthMessage(minLength: number, textFieldName?: string) {
  return textFieldName
    ? `${textFieldName} must have at least ${minLength} characters.`
    : `Must have at least ${minLength} characters`;
}

export function minLengthAndMaxLengthMessage(
  minLength: number,
  maxLength: number,
  textFieldName?: string,
) {
  return textFieldName
    ? `${textFieldName} must have at least ${minLength} and at most ${maxLength} characters.`
    : `Must have at least ${minLength} and at most ${maxLength} characters.`;
}

export function minUppercaseMessage(minUppercase: number, textFieldName?: string) {
  return textFieldName
    ? `${textFieldName} must have at least ${minUppercase} uppercase characters.`
    : `Must have at least ${minUppercase} uppercase characters.`;
}

export function minSymbolsMessage(minSymbols: number, textFieldName?: string) {
  return textFieldName
    ? `${textFieldName} must have at least ${minSymbols} symbols.`
    : `Must have at least ${minSymbols} symbols.`;
}

export const DEFAULT_MESSAGE = 'This field is required.';
