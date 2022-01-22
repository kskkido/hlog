import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as postMetadataDTO from 'models/postMetadataDTO';
import * as types from '../types';

export const dto = (x: postMetadataDTO.types.PostMetadataDTO): Option.Option<types.PostMetadata> => {
  return pipe(
    Option.Do,
    Option.apS('date', lib.parser.date.parse(x.date)),
    Option.apS('length', lib.parser.number.parse(x.length)),
    Option.chain(({ date, length }) => pipe(types.PostMetadata.decode({ ...x, date, length }), Option.fromEither))
  );
};
