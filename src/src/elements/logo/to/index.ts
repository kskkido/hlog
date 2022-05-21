import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';

export const background = (x: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(
    ReadonlyArray.compact(
      pipe(
        Array.from(x.querySelectorAll('*[data-type~="background"]')),
        ReadonlyArray.map(Option.fromEitherK(lib.element.types.HTMLElement.decode))
      )
    ),
    ReadonlyArray.head
  );
};
