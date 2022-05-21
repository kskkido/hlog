import { constant, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as states from 'states';
import * as events from '../events';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      animations: states.animations.types.State;
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) =>
  (w: Window) => {
    return rxjs
      .combineLatest([
        tags(e)($state)(w),
        animate(e)(
          $state.pipe(
            rxjs.map((s) => s.animations),
            rxjs.distinctUntilChanged()
          )
        )
      ])
      .pipe(rxjs.map(constant(null)));
  };

export const tags =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) =>
  (w: Window) => {
    return events
      .template(e)($state)(w)
      .pipe(
        rxjs.distinctUntilChanged(),
        rxjs.map(flow(lib.element.from.string, Option.toNullable)),
        rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
        rxjs.withLatestFrom(
          events
            .transition(e)($state)
            .pipe(
              rxjs.tap((to) => {
                Array.from(e.querySelectorAll(`#transition-${to}`)).forEach((lx) => {
                  e.removeChild(lx);
                });
              })
            )
        ),
        rxjs.tap(([rx]) => {
          e.appendChild(rx);
        })
      );
  };

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors
      .lookup(lib.element.to.identifier(e))($state)
      .pipe(
        rxjs.tap((t) => {
          lib.animation.concat([
            pipe(
              pipe(
                lib.animation.concat([
                  elements.slot.to.animation(`transition-${0}`)(e),
                  () => elements.slot.to.visible(`transition-${0}`)(e)
                ]),
                lib.frp.behavior.after([0, () => elements.slot.to.hidden(`transition-${0}`)(e)])
              ),
              lib.animation.reverse,
              lib.animation.between([0, 0.5])
            ),
            pipe(
              pipe(
                lib.animation.concat([
                  elements.slot.to.animation(`transition-${1}`)(e),
                  () => elements.slot.to.visible(`transition-${1}`)(e)
                ]),
                lib.frp.behavior.after([0, () => elements.slot.to.hidden(`transition-${1}`)(e)])
              ),
              lib.animation.between([0.5, 1])
            )
          ])(t);
        })
      );
  };
