export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
}

export const formatPhone = (phone: string) => `+${phone.slice(0,3)} (${phone.slice(3,5)}) ${phone.slice(5,8)} ${phone.slice(8)}`;