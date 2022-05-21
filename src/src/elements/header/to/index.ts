import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as content from 'elements/content';

export const animation = (x: lib.element.types.Element): lib.animation.types.Animation => {
  return lib.animation.stagger(0.4)(
    pipe(
      content.from.element(x),
      ReadonlyArray.map((element) =>
        pipe(
          lib.animation.concat([
            models.animation.constants.slideInBottom(element),
            models.animation.constants.fadeIn(element)
          ]),
          lib.frp.behavior.contramap(lib.time.lerpish)
        )
      )
    )
  );
};
