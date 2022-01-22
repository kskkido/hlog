import * as record from '/modules/lib/record/index.js';

export const makeSelectByKey = (key) => (state) => state[key] || null;

export const makeSelectEntries = () => (state) => record.toArray(state);

export const makeSelectHoverIn = () => (state) =>
  makeSelectEntries()(state).filter(([_, value]) => value === 'in');

export const makeSelectHoverOut = () => (state) =>
  makeSelectEntries()(state).filter(([_, value]) => value === 'out');
