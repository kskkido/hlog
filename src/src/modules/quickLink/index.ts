import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';

export const main = (w: Window) => {
  return rxjs
    .merge(
      ...pipe(
        elements.quickLink.from.window(w),
        ReadonlyArray.map((e) => rxjs.fromEvent(e, 'click'))
      )
    )
    .pipe(
      rxjs.tap(() => {
        w.navigator.clipboard.writeText(lib.url.fromLocation(location));
      })
    );
};
