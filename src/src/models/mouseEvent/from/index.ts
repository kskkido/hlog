import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const event = (e: Event): Option.Option<types.MouseEvent> => {
  return pipe(
    e,
    Option.fromPredicate((e): e is MouseEvent => e instanceof MouseEvent),
    Option.chain((e) => pipe(types.MouseEvent.decode({ clientX: e.clientX, clientY: e.clientY }), Option.fromEither))
  );
};
