import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const path = (e: lib.element.types.HTMLElement): Option.Option<lib.element.types.SVGGeometryElement> => {
  return pipe(
    Option.fromNullable(e.querySelector('#circle')),
    Option.chain(Option.fromEitherK(lib.element.types.SVGGeometryElement.decode))
  );
};
