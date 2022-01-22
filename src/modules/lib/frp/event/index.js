export const time = (ea) => {
  return ea[0];
};

export const fmap = (fn) => (ea) => {
  return [time(ea), fn(extract(ea))];
};

export const join = (eea) => {
  return eea[1];
};

export const extract = (ea) => {
  return ea[1];
};

export const duplicate = (ea) => {
  return [time(ea), ea];
};

export const extend = (fn) => (ea) => {
  return fmap(fn)(duplicate(ea));
};

export const race = (ea) => (eb) => {
  return time(ea) < time(eb) ? ea : eb;
};
