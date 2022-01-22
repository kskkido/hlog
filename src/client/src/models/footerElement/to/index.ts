import * as types from '../types';
import * as itemElement from 'models/itemElement';

export const children = (x: types.FooterElement) => {
  return Array.from(x.children);
};

export const itemElements = (x: types.FooterElement) => {
  return itemElement.from.element(x);
};
