import { apply, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as states from 'states';
import * as templates from 'templates';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) => {
    return transition(e)($state).pipe(
      rxjs.map((to) => [
        states.animations.actions.update(
          states.animation.actions.tween({
            value: to,
            speed: 0.03
          })
        )(lib.element.to.identifier(e))
      ])
    );
  };

export const transition =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) => {
    return filter(e)($state).pipe(
      rxjs.distinctUntilChanged(models.tagFilter.eq.deep.equals),
      rxjs.scan(lib.progressRange.lib.toggle, 0)
    );
  };

export const unmount = (e: lib.element.types.HTMLElement) => {
  return rxjs.of(null).pipe(
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.tween({
          value: 0.5,
          speed: 0.08,
          threshold: 0.01
        })
      )(lib.element.to.identifier(e))
    ])
  );
};
export const filter =
  (_: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) => {
    return $state.pipe(
      rxjs.map((s) => s.tagFilter),
      rxjs.distinctUntilChanged(models.tagFilter.eq.deep.equals)
    );
  };

export const metadata =
  (_: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) => {
    return $state.pipe(
      rxjs.map((state) =>
        pipe(
          state.tagMetadataRecord,
          models.tagMetadataRecord.to.list,
          flow(models.tagFilter.lib.match, apply(state.tagFilter))
        )
      ),
      rxjs.distinctUntilChanged(ReadonlyArray.getEq(models.tagMetadata.eq.deep).equals)
    );
  };

export const template =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      tagFilter: states.tagFilter.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) =>
  (w: Window) => {
    return transition(e)($state).pipe(
      rxjs.withLatestFrom(filter(e)($state)),
      rxjs.withLatestFrom(metadata(e)($state)),
      rxjs.map(([[to, fx], tags]) =>
        (fx.view === 'grid' ? templates.tagGrid.create : templates.tagList.create)({
          id: `transition-${to}`,
          tags
        })(w)
      )
    );
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
    return template(e)($state)(w).pipe(
      rxjs.distinctUntilChanged(),
      rxjs.map(flow(lib.element.from.string, Option.toNullable)),
      rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
      rxjs.withLatestFrom(
        transition(e)($state).pipe(
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

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors
      .lookup(lib.element.to.identifier(e))($state)
      .pipe(rxjs.map((n) => Math.abs(n - 0.5) * 2));
  };
