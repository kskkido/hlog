import * as Option from 'fp-ts/Option';

export const parse = (x: unknown): Option.Option<string> => {
  return typeof x === 'string' ? Option.of(x) : Option.none;
};
