import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';

export { types };

export const main = ($time: rxjs.Observable<number>) => (state: types.State) => (action: types.Action) => {
  if (types.SetAction.is(action)) {
    return set(state)(action);
  } else if (types.TweenAction.is(action)) {
    return tween($time)(state)(action);
  } else if (types.LinearAction.is(action)) {
    return linear($time)(state)(action);
  } else {
    return rxjs.of(state);
  }
};

export const set =
  (_: types.State) =>
  (action: types.SetAction): rxjs.Observable<types.State> => {
    return rxjs.of(action.payload);
  };

export const tween =
  ($time: rxjs.Observable<number>) =>
  (state: types.State) =>
  (action: types.TweenAction): rxjs.Observable<types.State> => {
    return $time.pipe(
      rxjs.scan(
        (tween) =>
          lib.math.lerpW(
            tween,
            action.payload.value,
            action.payload.speed
          )('threshold' in action.payload ? action.payload.threshold : 0.001),
        state
      ), // win!
      rxjs.takeWhile((x) => x !== action.payload.value),
      rxjs.endWith(action.payload.value)
    );
  };

export const linear =
  ($time: rxjs.Observable<number>) =>
  (state: types.State) =>
  (action: types.LinearAction): rxjs.Observable<types.State> => {
    return lib.rxjs
      .duration(action.payload.duration)($time)
      .pipe(
        rxjs.map((d) => lib.math.lerpW(state, action.payload.value, d)(0.001)),
        rxjs.endWith(action.payload.value)
      );
  };
