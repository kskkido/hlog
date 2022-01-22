import * as lib from '/modules/lib/index.js';

export const fromName = (name) => (tags) => {
  return tags.find((tag) => tag.name === name);
};

export const fromDTO = (dto) => {
  return lib.maybe.bind(
    (size) =>
      fromUnknown({
        ...dto,
        size,
      }),
    lib.parser.number(dto.size)
  );
};

export const fromUnknown = (unknown) => {
  return lib.fn.pipe(
    unknown,
    lib.validator.schema.create({
      name: lib.validator.string.validate,
      size: lib.validator.number.validate,
      url: lib.validator.string.validate,
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
  return -1;
};

export const compareByTitle = (x, y) => {
  return x.name.localeCompare(y.name);
};

export const compareByLength = (x, y) => {
  return -1;
};
