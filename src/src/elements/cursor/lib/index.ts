import * as IO from 'fp-ts/IO';
import * as lib from 'lib';
import * as models from 'models';

export const update =
  (model: models.cursor.types.Cursor) =>
  (x: lib.element.types.HTMLElement): IO.IO<void> => {
    return () => {
      const position = lib.shape.to.center({
        ...lib.element.to.shape(x),
        position: model.position
      });
      x.style.transform = `translate(${lib.vector2.toX(position)}px, ${lib.vector2.toY(position)}px) scale(${
        model.scale
      })`;
    };
  };
