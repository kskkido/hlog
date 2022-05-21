import * as Option from 'fp-ts/Option';

export const parse = (x: string): Option.Option<unknown> => {
  try {
    return Option.of(JSON.parse(x));
  } catch {
    return Option.none;
  }
};
