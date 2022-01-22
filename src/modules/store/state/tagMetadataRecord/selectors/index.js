import * as lib from '/modules/lib/index.js';

export const makeSelectByKey = (key) => (state) => state[key] || null;

export const makeSelectEntries = () => (state) => lib.record.toArray(state);

export const makeSelectValues = () =>
  lib.fn.flow(makeSelectEntries(), (entries) =>
    entries.map((entry) => entry[1])
  );
