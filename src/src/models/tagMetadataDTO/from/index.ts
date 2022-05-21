import { pipe, flow } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.TagMetadataDTO> => {
  return pipe(
    Array.from(w.document.querySelectorAll('[data-metadata_type="tag"]')),
    ReadonlyArray.map(flow(lib.element.to.htmlElement, Option.chain(element))),
    ReadonlyArray.compact
  );
};

export const element = (e: HTMLElement): Option.Option<types.TagMetadataDTO> => {
  return pipe(types.TagMetadataDTO.decode({ ...e.dataset }), Option.fromEither);
};
