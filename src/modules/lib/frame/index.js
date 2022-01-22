import * as memoize from '/modules/lib/memoize/index.js';

export const global = memoize.once((w) => {
  return w.rxjs.animationFrames().pipe(w.rxjs.share());
});
