import { identity, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as states from 'states';
import * as models from 'models';

export const observe = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(mount(e), input(e));
};

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      elements.content.from.element(e),
      ReadonlyArray.mapWithIndex((i, c) =>
        rxjs.timer(0 + i * 50).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 1,
                speed: 0.04,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      )
    )
  );
};

export const unmount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      elements.content.from.element(e),
      ReadonlyArray.reverse,
      ReadonlyArray.mapWithIndex((i, c) =>
        rxjs.timer(i * 25).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 0,
                speed: 0.2,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      )
    )
  );
};

export const input = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(view(e), sort(e), order(e));
};

export const view = (e: lib.element.types.HTMLElement) => {
  return rxjs
    .merge(
      ...pipe(
        elements.tagFilter.to.tagViewWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagViewWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.map((i) =>
          rxjs.fromEvent(i, 'click').pipe(
            rxjs.map(() =>
              pipe(i.dataset.value, Option.fromEitherK(models.viewType.types.ViewType.decode), Option.toNullable)
            ),
            rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
          )
        )
      )
    )
    .pipe(rxjs.map((value) => [states.tagFilter.actions.set({ view: value })]));
};

export const sort = (e: lib.element.types.HTMLElement) => {
  return rxjs
    .merge(
      ...pipe(
        elements.tagFilter.to.tagSortWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagSortWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.map((i) =>
          rxjs.fromEvent(i, 'click').pipe(
            rxjs.map(() =>
              pipe(i.dataset.value, Option.fromEitherK(models.tagSortType.types.TagSortType.decode), Option.toNullable)
            ),
            rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
          )
        )
      )
    )
    .pipe(rxjs.map((value) => [states.tagFilter.actions.set({ sort: value })]));
};

export const order = (e: lib.element.types.HTMLElement) => {
  return rxjs
    .merge(
      ...pipe(
        elements.tagFilter.to.tagOrderWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagOrderWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.map((i) =>
          rxjs.fromEvent(i, 'click').pipe(
            rxjs.map(() =>
              pipe(i.dataset.value, Option.fromEitherK(models.orderType.types.OrderType.decode), Option.toNullable)
            ),
            rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
          )
        )
      )
    )
    .pipe(rxjs.map((value) => [states.tagFilter.actions.set({ order: value })]));
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    const contents = elements.content.from.element(e);
    return rxjs
      .combineLatest(
        pipe(
          contents,
          ReadonlyArray.map((c) => pipe(states.animations.selectors.lookup(lib.element.to.identifier(c))($state)))
        )
      )
      .pipe(rxjs.map((ns) => lib.math.sum(ns) / contents.length));
  };
