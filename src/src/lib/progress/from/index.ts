import { constant, identity, pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import * as lib from 'lib';
import * as types from '../types';

export const number = (x: number): types.Progress => {
  return pipe(types.Progress.decode(x), Either.fold(constant(lib.math.clamp(x, 0, 1) as types.Progress), identity));
};
