import { pipe } from 'fp-ts/function';
import * as vector2 from 'lib/vector2';
import * as types from '../types';

export const center = (shape: types.Shape) => {
  return pipe(
    shape.position,
    vector2.bimap<number, number>((x) => x - shape.width / 2)((y) => y - shape.height / 2)
  );
};
