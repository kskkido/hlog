import * as t from 'io-ts';
import * as transitionTrigger from '../../transitionTrigger';

export const TransitionElement = t.intersection([
  new t.Type<Element, unknown, unknown>(
    'Element',
    (x): x is Element => x instanceof Element,
    (x, c) => (x instanceof Element ? t.success(x) : t.failure(x, c)),
    (x) => x
  ),
  t.type({
    dataset: t.type({
      transition_trigger: transitionTrigger.types.TransitionTrigger
    })
  })
]);

export type TransitionElement = t.TypeOf<typeof TransitionElement>;
