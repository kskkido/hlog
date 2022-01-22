import * as record from '/modules/lib/record/index.js';

export const makeSelectByKey = (key) => (state) => state[key] || null;

export const makeSelectEntries = () => (state) => record.toArray(state);
