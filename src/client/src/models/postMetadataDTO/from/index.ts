import { pipe, flow } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.PostMetadataDTO> => {
  return pipe(
    Array.from(w.document.querySelectorAll('[data-metadata_type="post"]')),
    ReadonlyArray.map(flow(lib.element.to.htmlElement, Option.chain(element))),
    ReadonlyArray.compact
  );
};

export const element = (e: HTMLElement): Option.Option<types.PostMetadataDTO> => {
  return pipe(
    lib.parser.string.parse(e.dataset.tags),
    Option.map((cs) => cs.split(',').map((tag) => tag.trim())),
    Option.chain((tags) => pipe(types.PostMetadataDTO.decode({ ...e.dataset, tags }), Option.fromEither))
  );
};
