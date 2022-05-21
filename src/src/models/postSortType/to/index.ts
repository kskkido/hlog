import * as postMetadata from 'models/postMetadata';
import * as types from '../types';

export const order = (x: types.PostSortType) => {
  if (x === 'date') {
    return postMetadata.order.date;
  } else if (x === 'title') {
    return postMetadata.order.title;
  } else {
    return postMetadata.order.length;
  }
};
