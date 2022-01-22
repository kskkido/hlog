import * as fn from '/modules/lib/fn/index.js';
import * as maybe from '/modules/lib/maybe/index.js';

export const node = (unknown) => {
  return unknown instanceof Node ? unknown : null;
};

export const html = (unknown) => {
  return unknown instanceof HTMLElement ? unknown : null;
};

export const string = (unknown) => {
  return typeof unknown === 'string' ? unknown : null;
};

export const number = (unknown) => {
  return fn.pipe(parseInt(unknown, 10), (mx) => maybe.guard(!isNaN(mx), mx));
};

export const element = (name) => (unknown) => {
  return maybe.bind(
    (el) => maybe.guard(el.tagName === name, maybe.pure(el)),
    html(unknown)
  );
};

export const date = (unknown) => {
  return maybe.bind(
    (cs) =>
      fn.pipe(new Date(cs), (dx) =>
        maybe.guard(!isNaN(dx.getTime()), maybe.pure(dx))
      ),
    string(unknown)
  );
};
