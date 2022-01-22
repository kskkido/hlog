import * as lib from '/modules/lib/index.js';

export const fromDTO = (dto) => {
  return lib.maybe.bind(
    (date) =>
      lib.maybe.bind(
        (length) =>
          fromUnknown({
            ...dto,
            date,
            length,
          }),
        lib.parser.number(dto.length)
      ),
    lib.parser.date(dto.date)
  );
};

export const fromUnknown = (unknown) => {
  return lib.fn.pipe(
    unknown,
    lib.validator.schema.create({
      identifier: lib.validator.string.validate,
      title: lib.validator.string.validate,
      author: lib.validator.string.validate,
      date: lib.validator.date.validate,
      url: lib.validator.string.validate,
      length: lib.validator.number.validate,
      tags: lib.validator.array.create(lib.validator.string.validate),
    }),
    lib.validation.maybe
  );
};

export const orderBy = (type) => (compare) => {
  if (type === 'ascending') {
    return compare;
  } else {
    return lib.fn.flip(compare);
  }
};

export const compareBy = (type) => {
  if (type === 'date') {
    return compareByDate;
  } else if (type === 'title') {
    return compareByTitle;
  } else {
    return compareByLength;
  }
};

export const compareByDate = (x, y) => {
  return x.date - y.date;
};

export const compareByTitle = (x, y) => {
  return x.title.localeCompare(y.title);
};

export const compareByLength = (x, y) => {
  return x.length - y.length;
};
