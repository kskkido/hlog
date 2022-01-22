import * as event from '../event/index.js';

export const at = (ba) => (t) => {
  return ba(t);
};

export const pure = (a) => {
  return (_) => a;
};

export const fmap = (fn) => (ba) => {
  return (t) => fn(ba(t));
};

export const bind = (ba) => (fn) => {
  return (t) => fn(ba(t))(t);
};

export const apply = (bfn) => (ba) => {
  return (t) => bfn(t)(ba(t));
};

export const liftA2 = (fn) => (ba) => (bb) => {
  return apply(fmap(fn)(ba))(bb);
};

export const tap = apply(pure);

export const sequence = (bs) => {
  return bs.reduce(
    (bas, ba) => liftA2((as) => (a) => [...as, a])(bas)(ba),
    pure([])
  );
};

export const until = (ba) => (eba) => {
  return (t) => (t < event.time(eba) ? at(ba)(t) : at(event.extract(eba))(t));
};

export const time = (t) => {
  return t;
};

export const transform = (bt) => (ba) => {
  return (t) => at(ba)(at(bt)(t));
};

export const snapshot = (ea) => (bb) => {
  return [event.time(ea), [event.extract(ea), at(bb)(event.time(ea))]];
};
