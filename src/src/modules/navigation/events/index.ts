import { constant, identity, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as states from 'states';

export const observe = (w: Window) => {
  return navigate(w);
};

export const navigate = (w: Window) => {
  return rxjs.fromEvent(w.document, 'click').pipe(
    rxjs.map((event) =>
      pipe(
        models.linkElement.from.event(event),
        Option.map((link) => link.href),
        Option.chainFirst(() => Option.of(event.preventDefault())),
        Option.chainFirst((path) => pipe(Option.guard(lib.url.normalize(path).length > 0))),
        Option.fold(constant(null), identity)
      )
    ),
    rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
    rxjs.distinctUntilChanged(),
    rxjs.map(models.location.from.path),
    rxjs.map((x) => [states.history.actions.push(x), states.scene.actions.set('outro')])
  );
};
