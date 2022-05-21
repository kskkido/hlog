import * as t from 'io-ts';

interface Brand {
  readonly Progress: unique symbol;
}

export const Progress = t.brand(t.number, (n): n is t.Branded<number, Brand> => 0 <= n && n <= 1, 'Progress');

export type Progress = t.TypeOf<typeof Progress>;
