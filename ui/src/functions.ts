export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const fullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
}
