import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as tagMetadataDTO from 'models/tagMetadataDTO';
import * as types from '../types';

export const dto = (x: tagMetadataDTO.types.TagMetadataDTO): Option.Option<types.TagMetadata> => {
  return pipe(
    Option.Do,
    Option.apS('size', lib.parser.number.parse(x.size)),
    Option.chain(({ size }) => pipe(types.TagMetadata.decode({ ...x, size }), Option.fromEither))
  );
};

export const name =
  (cs: string) =>
  (xs: ReadonlyArray<types.TagMetadata>): Option.Option<types.TagMetadata> => {
    return pipe(
      xs,
      ReadonlyArray.findFirst((tag) => tag.name === cs)
    );
  };
