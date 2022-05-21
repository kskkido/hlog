import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as elements from 'elements';

export const headings = (x: lib.element.types.HTMLElement): ReadonlyArray<lib.element.types.HTMLElement> => {
  return pipe(elements.heading.from.element(x));
};

export const anchors =
  (x: lib.element.types.HTMLElement) =>
  (w: Window): ReadonlyArray<[lib.element.types.HTMLElement, lib.element.types.HTMLAnchorElement]> => {
    return pipe(
      headings(x),
      ReadonlyArray.map((h) =>
        pipe(
          elements.anchor.from.title(h.id)(w),
          Option.map((a) => [h, a] as [typeof h, typeof a])
        )
      ),
      ReadonlyArray.compact
    );
  };

export const animation = (x: lib.element.types.Element): lib.animation.types.Animation => {
  return lib.animation.stagger(0.4)(
    pipe(
      elements.content.from.element(x),
      ReadonlyArray.map((element) =>
        pipe(
          lib.animation.concat([
            models.animation.constants.slideInBottomPx(36)(element),
            models.animation.constants.fadeIn(element)
          ]),
          lib.frp.behavior.contramap(lib.time.lerpish)
        )
      )
    )
  );
};
