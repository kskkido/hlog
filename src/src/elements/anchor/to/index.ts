import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const target =
  (x: lib.element.types.HTMLElement) =>
  (w: Window): Option.Option<lib.element.types.HTMLElement> => {
    return pipe(
      x.dataset.target,
      Option.fromEitherK(t.string.decode),
      Option.chain((s) =>
        pipe(
          w.document.querySelector(`#${s}`),
          Option.fromNullable,
          Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode))
        )
      )
    );
  };
