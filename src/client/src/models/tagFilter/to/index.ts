import { pipe } from 'fp-ts/function';
import * as Ord from 'fp-ts/Ord';
import * as tagMetadata from 'models/tagMetadata';
import * as tagSortType from 'models/tagSortType';
import * as orderType from 'models/orderType';
import * as types from '../types';

export const order = (x: types.TagFilter): Ord.Ord<tagMetadata.types.TagMetadata> => {
  return pipe(tagSortType.to.order(x.sort), orderType.to.transform(x.order));
};
