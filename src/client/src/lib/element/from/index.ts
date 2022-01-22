import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';

export const string = (s: string): Option.Option<Element> => {
  return pipe(
    Option.of(new DOMParser().parseFromString(s, 'text/html')),
    Option.chain((dom) =>
      pipe(
        Option.guard(!dom.querySelector('parsererror')),
        Option.apSecond(Option.fromNullable(dom.body.firstElementChild))
      )
    )
  );
};

export const unknown = (x: unknown): Option.Option<Element> => {
  return Option.fromNullable(x instanceof Element ? x : null);
};
