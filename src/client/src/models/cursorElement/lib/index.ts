import * as IO from 'fp-ts/IO';
import * as lib from 'lib';
import * as types from '../types';

export const move =
  (vx: lib.vector2.types.Vector2<number>) =>
  (x: types.CursorElement): IO.IO<void> => {
    return () => {
      const position = lib.shape.to.center({
        ...lib.element.to.shape(x),
        position: vx
      });
      x.style.transform = `translate(${lib.vector2.toX(position)}px, ${lib.vector2.toY(position)}px)`;
    };
  };
