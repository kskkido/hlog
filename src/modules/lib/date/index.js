export const toISOString = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/T.*/, '');
};
