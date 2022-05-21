import { constant, pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as frp from 'lib/frp';
import * as range from 'lib/range';
import * as types from './types';

export { types };

export const between =
  (rx: range.types.Range) =>
  (ba: types.Animation): types.Animation => {
    return pipe(
      ba,
      frp.behavior.contramap((t) => (t - rx[0]) / range.lib.distance(rx)),
      frp.behavior.after([rx[0], () => ba(0)]),
      frp.behavior.until([rx[1], () => ba(1)])
    );
  };

export const concat = (bas: ReadonlyArray<types.Animation>): types.Animation => {
  return pipe(frp.behavior.sequence(bas), frp.behavior.map(constant(null)));
};

export const reverse = (ba: types.Animation): types.Animation => {
  return pipe(
    ba,
    frp.behavior.contramap((t) => 1 - t)
  );
};

export const stagger =
  (total: number) =>
  (bas: ReadonlyArray<types.Animation>): types.Animation => {
    if (bas.length > 1) {
      const s = total / (bas.length - 1);
      return pipe(
        bas,
        ReadonlyArray.mapWithIndex((i, ba) => pipe(ba, between([s * i, s * i + (1 - total)]))),
        concat
      );
    } else {
      return concat(bas);
    }
  };
