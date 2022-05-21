import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const open = (x: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(
    x.querySelector('*[data-value~="open"]'),
    Option.fromNullable,
    Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode))
  );
};

export const closed = (x: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(
    x.querySelector('*[data-value~="closed"]'),
    Option.fromNullable,
    Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode))
  );
};
