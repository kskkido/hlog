import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as location from 'models/location';
import * as types from '../types';

export const push =
  (l: location.types.Location) =>
  (h: types.History): types.History => {
    return pipe(
      Option.fromNullable(h.present),
      Option.fold(
        () => ({ ...h, present: l }),
        (p) => ({ ...h, past: [...h.past, p], present: l })
      )
    );
  };

export const back = (h: types.History): types.History => {
  return pipe(
    h.past,
    ReadonlyArray.matchRight(
      () => h,
      (init, tail) =>
        pipe(
          Option.fromNullable(h.present),
          Option.fold(
            () => ({ ...h, past: init, present: tail }),
            (p) => ({ past: init, present: tail, future: [p, ...h.future] })
          )
        )
    )
  );
};

export const forward = (h: types.History): types.History => {
  return pipe(
    h.future,
    ReadonlyArray.matchLeft(
      () => h,
      (head, rest) =>
        pipe(
          Option.fromNullable(h.present),
          Option.fold(
            () => ({ ...h, future: rest, present: head }),
            (p) => ({ past: [...h.past, p], present: head, future: rest })
          )
        )
    )
  );
};
