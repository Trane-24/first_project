export const isRequired = {
  value: true,
  message: 'This field is require!'
}

export const isEmail = {
  value: /\S+@\S+\.\S+/,
  message: 'Email is invalid!'
}

export const isPassword = {
  value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
  message: 'Minimum 6 characters, at least one letter and one number'
}
