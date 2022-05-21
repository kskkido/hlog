import * as t from 'io-ts';

export const AnimationGroupConfig = t.type({
  start: t.number,
  end: t.number,
  stagger: t.number,
});

export type AnimationGroupConfig = t.TypeOf<typeof AnimationGroupConfig>;
