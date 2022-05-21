import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as elements from 'elements';

export const tagViewWidget = (e: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return ReadonlyArray.head(elements.tagViewWidget.from.element(e));
};

export const tagSortWidget = (e: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return ReadonlyArray.head(elements.tagSortWidget.from.element(e));
};

export const tagOrderWidget = (e: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
  return ReadonlyArray.head(elements.tagOrderWidget.from.element(e));
};

export const animation = (x: lib.element.types.Element): lib.animation.types.Animation => {
  return lib.animation.stagger(0.6)(
    pipe(
      elements.content.from.element(x),
      ReadonlyArray.map((element) =>
        pipe(
          lib.animation.concat([models.animation.constants.slideInBottom(element)]),
          lib.frp.behavior.contramap(lib.time.lerpish)
        )
      )
    )
  );
};
