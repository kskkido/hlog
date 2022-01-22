import * as lib from 'lib';
import * as types from '../types';

export const position = (element: types.CursorElement) => {
  return lib.element.to.position(element);
};
