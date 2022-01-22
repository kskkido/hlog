import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromElement,
      lib.element.toArray(
        w.document.querySelectorAll('[data-metadata_type="post"]')
      )
    )
  );
};

export const fromElement = (element) => {
  return lib.maybe.bind(
    (tags) =>
      fromUnknown({
        tags,
        identifier: element.dataset.identifier,
        title: element.dataset.title,
        author: element.dataset.author,
        date: element.dataset.date,
        url: element.dataset.url,
        length: element.dataset.length,
      }),
    lib.maybe.fmap(
      (cs) => cs.split(',').map((tag) => tag.trim()),
      lib.parser.string(element.dataset.tags)
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.fn.pipe(
    unknown,
    lib.validator.schema.create({
      identifier: lib.validator.string.validate,
      title: lib.validator.string.validate,
      author: lib.validator.string.validate,
      date: lib.validator.string.validate,
      url: lib.validator.string.validate,
      length: lib.validator.string.validate,
      tags: lib.validator.array.create(lib.validator.string.validate),
    }),
    lib.validation.maybe
  );
};
