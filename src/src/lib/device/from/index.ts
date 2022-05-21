import { constant, identity, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const window = (w: Window): types.Device => {
  return pipe(
    Option.zero<types.Device>(),
    Option.alt(() =>
      pipe(
        Option.guard(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(w.navigator.userAgent)),
        Option.map(constant('mobile' as types.Device))
      )
    ),
    Option.alt(() =>
      pipe(
        Option.guard(w.navigator.platform === 'MacIntel' && w.navigator.maxTouchPoints > 1),
        Option.map(constant('mobile' as types.Device))
      )
    ),
    Option.fold(constant('desktop' as types.Device), identity)
  );
};
