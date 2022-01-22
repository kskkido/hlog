import * as types from '../types';
import * as sectionElement from 'models/sectionElement';

export const children = (x: types.MainElement) => {
  return Array.from(x.children);
};

export const sectionElements = (x: types.MainElement) => {
  return sectionElement.from.element(x);
};
