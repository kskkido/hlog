import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as elements from 'elements';
import * as models from 'models';
import * as types from '../types';

export const window = (w: Window): rxjs.Observable<types.Actor> => {
  return rxjs.fromEvent(w, 'resize').pipe(
    rxjs.startWith(null),
    rxjs.map(() =>
      pipe(
        Option.Do,
        Option.apS('menu', elements.menu.from.first(w)),
        Option.apS('menuTrigger', elements.menuTrigger.from.first(w)),
        Option.apS('brightnessTrigger', elements.brightnessTrigger.from.first(w)),
        Option.apS('breadcrumbs', elements.breadcrumbs.from.first(w)),
        Option.apS('cursor', elements.cursor.from.first(w)),
        Option.apS('header', elements.header.from.unique(w)),
        Option.apS('footer', elements.footer.from.unique(w)),
        Option.apS('title', elements.title.from.unique(w)),
        Option.apS('articleBody', elements.articleBody.from.first(w)),
        Option.apS('articleFooter', elements.articleFooter.from.first(w)),
        Option.apS('articleMetadata', elements.articleMetadata.from.first(w)),
        Option.apS('articleTableOfContents', pipe(elements.articleTableOfContents.from.first(w))),
        Option.toNullable
      )
    ),
    rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
    rxjs.distinctUntilChanged((x, y) => models.elementRecord.eq.identifier.equals(x, y))
  );
};
