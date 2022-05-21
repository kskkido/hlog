import * as types from '../types';

export const noop: types.Action<'@noop', undefined> = { type: '@noop', payload: undefined };
