export const from = (type) => {
  return Object.assign((payload, metadata) => ({ payload, metadata, type }), {
    type,
  });
};
