import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromElement,
      lib.element.toArray(
        w.document.querySelectorAll('[data-metadata_type="tag"]')
      )
    )
  );
};

export const fromElement = (element) => {
  return fromUnknown({
    name: element.dataset.name,
    size: element.dataset.size,
    url: element.dataset.url,
  });
};

export const fromUnknown = (unknown) => {
  return lib.fn.pipe(
    unknown,
    lib.validator.schema.create({
      name: lib.validator.string.validate,
      size: lib.validator.string.validate,
      url: lib.validator.string.validate,
    }),
    lib.validation.maybe
  );
};
