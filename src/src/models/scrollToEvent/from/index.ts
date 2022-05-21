import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const event = (e: Event): Option.Option<types.ScrollToEvent> => {
  return pipe(
    e,
    Option.fromPredicate((e): e is CustomEvent => e instanceof CustomEvent),
    Option.chain((e) => pipe(types.ScrollToEvent.decode({ detail: e.detail }), Option.fromEither))
  );
};

export const detail = (n: number): types.ScrollToEvent => ({
  detail: n
});
