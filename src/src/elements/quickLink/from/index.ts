import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLElement> => {
  return pipe(
    Array.from(w.document.querySelectorAll('*[data-type="quick_link"]')),
    ReadonlyArray.map(Option.fromEitherK(lib.element.types.HTMLElement.decode)),
    ReadonlyArray.compact
  );
};
