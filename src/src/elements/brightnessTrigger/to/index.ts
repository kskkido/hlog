import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const dark = (x: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(
    x.querySelector('*[data-value~="dark"]'),
    Option.fromNullable,
    Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode))
  );
};

export const light = (x: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(
    x.querySelector('*[data-value~="light"]'),
    Option.fromNullable,
    Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode))
  );
};
