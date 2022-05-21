import * as Eq from 'fp-ts/Eq';
import * as Record from 'fp-ts/Record';
import * as lib from 'lib';
import * as types from '../types';

export const identifier: Eq.Eq<types.ElementRecord> = Record.getEq(
  Eq.fromEquals((x, y) => lib.element.to.identifier(x) === lib.element.to.identifier(y))
);
