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
      postFilter: states.postFilter.types.State;
      postMetadataRecord: states.postMetadataRecord.types.State;
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
      postFilter: states.postFilter.types.State;
      postMetadataRecord: states.postMetadataRecord.types.State;
    }>
  ) => {
    return filter(e)($state).pipe(
      rxjs.distinctUntilChanged(models.postFilter.eq.deep.equals),
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
      postMetadataRecord: states.postMetadataRecord.types.State;
      postFilter: states.postFilter.types.State;
    }>
  ) => {
    return $state.pipe(
      rxjs.map((s) => s.postFilter),
      rxjs.distinctUntilChanged(models.postFilter.eq.deep.equals)
    );
  };

export const metadata =
  (_: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      postFilter: states.postFilter.types.State;
      postMetadataRecord: states.postMetadataRecord.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) => {
    return rxjs.combineLatest([
      $state.pipe(
        rxjs.map((state) =>
          pipe(
            state.postMetadataRecord,
            models.postMetadataRecord.to.list,
            flow(models.postFilter.lib.match, apply(state.postFilter))
          )
        ),
        rxjs.distinctUntilChanged(ReadonlyArray.getEq(models.postMetadata.eq.deep).equals)
      ),
      $state.pipe(
        rxjs.map((state) => pipe(state.tagMetadataRecord, models.tagMetadataRecord.to.list)),
        rxjs.distinctUntilChanged(ReadonlyArray.getEq(models.tagMetadata.eq.deep).equals)
      )
    ]);
  };

export const template =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      postFilter: states.postFilter.types.State;
      postMetadataRecord: states.postMetadataRecord.types.State;
      tagMetadataRecord: states.tagMetadataRecord.types.State;
    }>
  ) =>
  (w: Window) => {
    return transition(e)($state).pipe(
      rxjs.withLatestFrom(filter(e)($state)),
      rxjs.withLatestFrom(metadata(e)($state)),
      rxjs.map(([[to, fx], [posts, tags]]) =>
        (fx.view === 'grid' ? templates.postGrid.create : templates.postList.create)({
          id: `transition-${to}`,
          posts,
          tags
        })(w)
      )
    );
  };

export const posts =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      postFilter: states.postFilter.types.State;
      postMetadataRecord: states.postMetadataRecord.types.State;
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
