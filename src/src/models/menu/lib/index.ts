import * as types from '../types';

export const toggle = (x: types.Menu): types.Menu => {
  return x === 'closed' ? 'open' : 'closed';
};
