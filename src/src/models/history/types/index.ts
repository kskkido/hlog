import * as t from 'io-ts';
import * as location from 'models/location';

export const History = t.type({
  past: t.readonlyArray(location.types.Location),
  present: t.union([location.types.Location, t.null]),
  future: t.readonlyArray(location.types.Location)
});

export type History = t.TypeOf<typeof History>;
