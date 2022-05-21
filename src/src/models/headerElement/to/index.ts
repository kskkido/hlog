import * as types from '../types';
import * as itemElement from 'models/itemElement';

export const children = (x: types.HeaderElement) => {
  return Array.from(x.children);
};

export const itemElements = (x: types.HeaderElement) => {
  return itemElement.from.element(x);
};
