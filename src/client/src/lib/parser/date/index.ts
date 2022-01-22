import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';

export const parse = (x: string): Option.Option<Date> => {
  return pipe(
    new Date(x),
    Option.fromNullableK((date) => (isNaN(date.getTime()) ? null : date))
  );
};
