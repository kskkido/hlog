import { constant, identity, apply, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  ($state: rxjs.Observable<{ animations: states.animations.types.State }>) =>
  (w: Window) => {
    return rxjs
      .merge(
        animate(e)(
          $state.pipe(
            rxjs.map((s) => s.animations),
            rxjs.distinctUntilChanged()
          )
        ),
        indicator(e)(w)
      )
      .pipe(rxjs.map(constant(null)));
  };

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors
      .lookup(lib.element.to.identifier(e))($state)
      .pipe(
        rxjs.tap(
          pipe(
            lib.animation.stagger(0.4)(
              pipe(
                elements.content.from.element(e),
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
            )
          )
        )
      );
  };

export const indicator = (e: lib.element.types.HTMLElement) => (w: Window) => {
  const pxs = elements.articleTableOfContents.to.targets(e)(w);
  return rxjs.fromEvent(w, 'scroll').pipe(
    rxjs.startWith(null),
    rxjs.tap(() => {
      const span = pipe(
        pxs,
        ReadonlyArray.spanLeft((px) => lib.element.to.visibility(px[1])(w) === 'visible')
      );
      pipe(
        ReadonlyArray.init(span.init),
        Option.fold(constant([]), identity),
        flow(ReadonlyArray.concat, apply(span.rest))
      ).forEach(([a]) => {
        a.classList.remove('active');
        a.classList.add('inactive');
      });
      pipe(
        ReadonlyArray.last(span.init),
        Option.alt(() => ReadonlyArray.head(pxs)),
        Option.map(([a]) => {
          a.classList.remove('inactive');
          a.classList.add('active');
        })
      );
    })
  );
};
