import { pipe } from 'fp-ts/function';
import * as Ord from 'fp-ts/Ord';
import * as postMetadata from 'models/postMetadata';
import * as postSortType from 'models/postSortType';
import * as orderType from 'models/orderType';
import * as types from '../types';

export const order = (x: types.PostFilter): Ord.Ord<postMetadata.types.PostMetadata> => {
  return pipe(postSortType.to.order(x.sort), orderType.to.transform(x.order));
};
