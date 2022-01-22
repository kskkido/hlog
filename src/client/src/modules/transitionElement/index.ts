import { apply, constant, pipe, flow } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as models from 'models';
import * as stores from 'stores';

export const load = (store: stores.types.Store) => (w: Window) => {
  return store[0].pipe(
    rxjs.map((state) => state.phase),
    rxjs.distinctUntilChanged(),
    rxjs.filter((phase) => phase === 'main'),
    rxjs.take(1),
    rxjs.map(
      constant(
        pipe(
          models.transitionElement.from.window(w),
          ReadonlyArray.filter((element) => element.dataset.transition_trigger === 'load'),
          ReadonlyArray.sort(models.transitionElement.order.offsetY)
        )
      )
    )
  );
};

export const viewport = (store: stores.types.Store) => (w: Window) => {
  const elements = pipe(
    models.transitionElement.from.window(w),
    ReadonlyArray.filter((element) => element.dataset.transition_trigger === 'viewport'),
    ReadonlyArray.sort(models.transitionElement.order.offsetY)
  );
  return store[0].pipe(
    rxjs.map((state) => state.scroll.y),
    rxjs.distinctUntilChanged(),
    rxjs.map(() =>
      pipe(
        elements,
        ReadonlyArray.spanLeft(flow(models.transitionElement.lib.above, apply(w))),
        (spanned) => [spanned.init, spanned.rest] as const
      )
    )
  );
};
