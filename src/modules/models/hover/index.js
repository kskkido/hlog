export const fromUnknown = (xs) => {
  return ['in', 'out'].includes(xs);
};

export const fromRange = (x) => {
  return x === 0 ? 'out' : 'in';
};

export const toRange = (x) => {
  return x === 'out' ? 0 : 1;
};

export const toggle = (x) => {
  return x === 'out' ? 'in' : 'out';
};
