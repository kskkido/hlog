import { constant, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as content from 'elements/content';

export const child =
  (id: string) =>
  (e: lib.element.types.HTMLElement): Option.Option<lib.element.types.HTMLElement> => {
    return pipe(e.querySelector(`#${id}`), Option.fromEitherK(lib.element.types.HTMLElement.decode));
  };

export const hidden = (id: string) => (e: lib.element.types.HTMLElement) => {
  return pipe([child(id)(e)], ReadonlyArray.compact, (xs) =>
    xs.forEach((x) => {
      x.classList.add('hidden');
    })
  );
};

export const visible = (id: string) => (e: lib.element.types.HTMLElement) => {
  return pipe([child(id)(e)], ReadonlyArray.compact, (xs) =>
    xs.forEach((x) => {
      x.classList.remove('hidden');
    })
  );
};

export const animation = (id: string) => (e: lib.element.types.HTMLElement) => {
  return pipe(
    child(id)(e),
    Option.fold(constant(constant(null)), (element) =>
      lib.animation.stagger(0.4)(
        pipe(
          content.from.element(element),
          ReadonlyArray.map((element) =>
            pipe(
              lib.animation.concat([
                models.animation.constants.slideInBottomPx(48)(element),
                models.animation.constants.fadeIn(element)
              ]),
              lib.frp.behavior.contramap(lib.time.lerpish)
            )
          )
        )
      )
    )
  );
};
