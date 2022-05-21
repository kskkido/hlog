import { pipe } from 'fp-ts/function';
import * as parser from 'lib/parser';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const string = (x: string): Option.Option<types.TagFilter> => {
  return pipe(parser.json.parse(x), Option.chain(Option.fromEitherK(types.TagFilter.decode)));
};
