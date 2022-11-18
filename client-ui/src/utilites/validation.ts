export const isRequired = {
  value: true,
  message: 'This field is required!'
}

export const isEmail = {
  value: /\S+@\S+\.\S+/,
  message: 'Email is invalid!'
}

export const isPassword = {
  value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
  message: 'Minimum 8 characters, at least one letter and one number'
}

export const isMatch = (value: string | undefined, matchField: string | undefined, message:string = 'Field not match') => {
  if (!value || !matchField) return true;
  return value === matchField || message;
}

export const isCountLetters = (value: string, count: number) => {
  return value.length >= count || `Please add ${count - value.length} characters`;
};
