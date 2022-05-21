import * as tagMetadata from 'models/tagMetadata';
import * as types from '../types';

export const order = (x: types.TagSortType) => {
  if (x === 'name') {
    return tagMetadata.order.name;
  } else {
    return tagMetadata.order.size;
  }
};
