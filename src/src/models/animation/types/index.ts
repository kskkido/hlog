import * as Reader from 'fp-ts/Reader';
import * as lib from 'lib';

export type Animation = Reader.Reader<HTMLElement, lib.animation.types.Animation>;
