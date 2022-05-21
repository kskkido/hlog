import { pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';

export const main = (e: HTMLElement) => (w: Window) => {
  return rxjs.merge(
    ...pipe(
      elements.articleBody.to.anchors(e)(w),
      ReadonlyArray.map(
        (px) =>
          [
            px,
            elements.icon.from.attributes({
              class: 'link fa-solid fa-link'
            })(w)
          ] as const
      ),
      ReadonlyArray.map((px) => {
        return pipe(
          IO.of(px[0][0].appendChild(px[1])),
          IO.apSecond(() => {
            return rxjs.fromEvent(px[1], 'click').pipe(
              rxjs.tap(() => {
                w.navigator.clipboard.writeText(
                  lib.url.append(px[0][1].getAttribute('href') || '')(lib.url.fromLocation(w.location))
                );
              })
            );
          })
        )();
      })
    )
  );
};
