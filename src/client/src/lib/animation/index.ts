import { constant, pipe } from 'fp-ts/function';
import * as frp from 'lib/frp';
import * as range from 'lib/range';
import * as types from './types';

export { types };

export const between =
  (rx: range.types.Range) =>
  (ba: types.Animation): types.Animation => {
    return pipe(
      ba,
      frp.behavior.after([rx[0], frp.behavior.pure(ba(0))]),
      frp.behavior.until([rx[1], frp.behavior.pure(ba(1))]),
      frp.behavior.contramap((t) => t - rx[0] / range.lib.distance(rx))
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
