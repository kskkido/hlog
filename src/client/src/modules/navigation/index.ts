import { constant, identity, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as stores from 'stores';

export const main = (store: stores.types.Store) => (w: Window) => {
  return location(w).pipe(
    rxjs.tap(flow(stores.state.history.actions.push, store[1])),
    rxjs.tap(flow(constant(stores.state.phase.actions.set('outro')), store[1]))
  );
};

export const location = (w: Window) => {
  return rxjs.fromEvent(w.document, 'click').pipe(
    rxjs.map((event) =>
      pipe(
        models.linkElement.from.event(event),
        Option.map((link) => link.href),
        Option.chainFirst((path) => pipe(Option.guard(lib.url.normalize(path) !== lib.url.normalize(w.location.href)))),
        Option.apFirst(Option.of(event.preventDefault())),
        Option.fold(constant(null), identity)
      )
    ),
    rxjs.filter((x): x is string => x !== null),
    rxjs.distinctUntilChanged(),
    rxjs.map(models.location.from.path)
  );
};
