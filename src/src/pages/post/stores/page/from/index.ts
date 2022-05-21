import { constant, identity, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as Reader from 'fp-ts/Reader';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as states from 'states';

export const event = ($time: rxjs.Observable<number>) => (w: Window) => {
  return pipe(
    Reader.Do,
    Reader.apS(
      'history',
      states.history.reducers.main({
        past: [],
        present: null,
        future: []
      })
    ),
    Reader.apS(
      'cursor',
      states.cursor.reducers.main({
        scale: 1,
        position: [0, 0]
      })
    ),
    Reader.apS(
      'brightness',
      pipe(
        models.storage.from.window(w)().brightness,
        Option.fromNullable,
        Option.fold(constant('light' as const), identity),
        states.brightness.reducers.main
      )
    ),
    Reader.apS('menu', states.menu.reducers.main('closed')),
    Reader.apS('scene', states.scene.reducers.main('intro')),
    Reader.apS('scroll', states.scroll.reducers.main({ y: 0 })),
    Reader.apS('animations', states.animations.reducers.main($time)({})),
    Reader.map(lib.rxjs.combine)
  );
};
