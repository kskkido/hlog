import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(
        w.document.querySelectorAll('*[data-featured_post_preview]')
      )
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.parser.html(unknown);
};
