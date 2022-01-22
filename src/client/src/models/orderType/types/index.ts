import * as t from 'io-ts';

export const OrderType = t.union([t.literal('ascending'), t.literal('descending')]);

export type OrderType = t.TypeOf<typeof OrderType>;
