import { flow, pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const first = (w: Window): Option.Option<lib.element.types.HTMLElement> => {
  return ReadonlyArray.head(window(w));
};

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLElement> => {
  return ReadonlyArray.compact(
    pipe(
      Array.from(w.document.querySelectorAll('*[data-type~="article-body"]')),
      ReadonlyArray.map(flow(unknown, Option.chain(lib.element.to.rendered)))
    )
  );
};

export const unknown = (x: unknown): Option.Option<lib.element.types.HTMLElement> => {
  return Option.fromEither(lib.element.types.HTMLElement.decode(x));
};
