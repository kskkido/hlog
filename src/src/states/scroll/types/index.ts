import * as t from 'io-ts';
import * as models from 'models';

export const State = models.scroll.types.Scroll;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('scroll/set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const TweenAction = t.type({
  type: t.literal('scroll/tween'),
  payload: t.union([
    t.type({
      value: t.number,
      speed: t.number
    }),
    t.type({
      value: t.number,
      speed: t.number,
      threshold: t.number
    })
  ])
});

export type TweenAction = t.TypeOf<typeof TweenAction>;

export const LinearAction = t.type({
  type: t.literal('scroll/linear'),
  payload: t.type({
    value: t.number,
    duration: t.number
  })
});

export type LinearAction = t.TypeOf<typeof LinearAction>;

export const Action = t.union([SetAction, TweenAction, LinearAction]);

export type Action = t.TypeOf<typeof Action>;