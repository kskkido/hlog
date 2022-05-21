import * as IO from 'fp-ts/IO';
import * as rxjs from 'rxjs';
import * as constants from '../constants';
import * as types from '../types';

export const io: IO.IO<types.EventSource> = () => {
  const unit = Symbol('unit');
  const $events = new rxjs.BehaviorSubject<ReadonlyArray<types.Event | typeof unit>>([unit]);

  return [
    $events.pipe(
      rxjs.mergeMap((events) => rxjs.from(events)),
      rxjs.filter(types.Event.is),
      rxjs.share(),
      rxjs.startWith(constants.noop)
    ),
    $events.next.bind($events)
  ];
};
