import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';

export const parse = (x: string): Option.Option<number> => {
  return pipe(parseFloat(x), (int) => (isNaN(int) ? Option.none : Option.some(int)));
};
