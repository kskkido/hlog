import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as content from 'elements/content';

export const inputs = (e: lib.element.types.HTMLElement): ReadonlyArray<lib.element.types.HTMLElement> => {
  return pipe(
    Array.from(e.querySelectorAll('[data-value]')),
    ReadonlyArray.map(Option.fromEitherK(lib.element.types.HTMLElement.decode)),
    ReadonlyArray.compact,
    ReadonlyArray.filter((e) => pipe(e.dataset.value, models.tagSortType.types.TagSortType.is))
  );
};

export const values = (e: lib.element.types.HTMLElement): ReadonlyArray<models.tagSortType.types.TagSortType> => {
  return pipe(
    inputs(e),
    ReadonlyArray.map((e) => pipe(e.dataset.value, Option.fromEitherK(models.tagSortType.types.TagSortType.decode))),
    ReadonlyArray.compact
  );
};

export const animation = (x: lib.element.types.Element): lib.animation.types.Animation => {
  return lib.animation.stagger(0.4)(
    pipe(
      content.from.element(x),
      ReadonlyArray.map((element) =>
        pipe(
          lib.animation.concat([models.animation.constants.slideInBottom(element)]),
          lib.frp.behavior.contramap(lib.time.lerpish)
        )
      )
    )
  );
};
