import * as t from 'io-ts';

export const Device = t.union([t.literal('desktop'), t.literal('mobile')]);

export type Device = t.TypeOf<typeof Device>;
