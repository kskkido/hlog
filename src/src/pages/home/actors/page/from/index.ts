import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as elements from 'elements';
import * as types from '../types';

export const window = (w: Window): Option.Option<types.Actor> => {
  return pipe(
    Option.Do,
    Option.apS('main', elements.main.from.first(w)),
    Option.apS('menu', elements.menu.from.first(w)),
    Option.apS('menuTrigger', elements.menuTrigger.from.first(w)),
    Option.apS('brightnessTrigger', elements.brightnessTrigger.from.first(w)),
    Option.apS('cursor', elements.cursor.from.first(w)),
    Option.apS('header', elements.header.from.unique(w)),
    Option.apS('footer', elements.footer.from.unique(w)),
    Option.apS('title', elements.title.from.unique(w)),
    Option.apS('posts', Option.of(elements.postLatest.from.window(w)))
  );
};
