import { constant, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as models from 'models';
import * as types from '../types';

export const put =
  (x: Partial<types.Storage>) =>
  (w: Window): IO.IO<void> => {
    return pipe(
      IO.sequenceArray([
        pipe(
          Option.fromNullable(x.brightness),
          Option.fold(constant(IO.of(null)), (brightness) => () => {
            w.localStorage.setItem('brightness', brightness);
          })
        ),
        pipe(
          Option.fromNullable(x.postFilter),
          Option.map(models.postFilter.to.string),
          Option.fold(constant(IO.of(null)), (postFilter) => () => {
            w.localStorage.setItem('postFilter', postFilter);
          })
        ),
        pipe(
          Option.fromNullable(x.tagFilter),
          Option.map(models.tagFilter.to.string),
          Option.fold(constant(IO.of(null)), (tagFilter) => () => {
            w.localStorage.setItem('tagFilter', tagFilter);
          })
        )
      ]),
      IO.map(constant(null))
    );
  };

export const clear = (w: Window): IO.IO<void> => {
  return () => {
    w.localStorage.removeItem('brightness');
    w.localStorage.removeItem('postFilter');
    w.localStorage.removeItem('tagFilter');
  };
};
