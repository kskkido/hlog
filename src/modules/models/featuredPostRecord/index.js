export const fromKeys = (keys) => {
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: 'in',
    }),
    {}
  );
};
