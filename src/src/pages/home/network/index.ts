import { pipe } from 'fp-ts/function';
import * as Tuple from 'fp-ts/Tuple';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as components from 'components';
import * as modules from 'modules';
import * as states from 'states';
import * as actors from '../actors';
import * as stores from '../stores';

export const main =
  ($actor: rxjs.Observable<actors.page.types.Actor>) =>
  ($state: rxjs.Observable<stores.page.types.State>) =>
  ($time: rxjs.Observable<number>) =>
  (source: lib.event.types.EventSource) =>
  (w: Window) => {
    return rxjs.combineLatest([
      $actor.pipe(
        rxjs.mergeMap((actor) =>
          rxjs.combineLatest([
            rxjs.combineLatest([
              modules.storage.events.observe($state)(w),
              components.html.views.observe($state)(w),
              components.menu.views.observe(actor.menu)($state),
              components.menuTrigger.views.observe(actor.menuTrigger)($state),
              components.brightnessTrigger.views.observe(actor.brightnessTrigger)($state),
              components.scroll.views.observe($state)(w),
              components.cursor.views.observe(actor.cursor)($state),
              components.footer.views.observe(actor.footer)($state),
              components.header.views.observe(actor.header)($state),
              components.title.views.observe(actor.title)($state),
              ...pipe(
                actor.posts,
                ReadonlyArray.map((post) => components.post.views.observe(post)($state))
              )
            ]),
            rxjs
              .merge(
                modules.navigation.events.observe(w),
                components.cursor.events.move($time)(w),
                components.scroll.events.observe($time)(w),
                components.main.events.observe(actor.main)($state)
              )
              .pipe(rxjs.tap(source[1])),
            states.scene.selectors
              .includes(['preload'])(
                $state.pipe(
                  rxjs.map((s) => s.scene),
                  rxjs.distinctUntilChanged()
                )
              )
              .pipe(
                rxjs.tap(() => {
                  source[1]([states.scene.actions.set('intro')]);
                })
              ),
            states.scene.selectors
              .includes(['intro'])(
                $state.pipe(
                  rxjs.map((s) => s.scene),
                  rxjs.distinctUntilChanged()
                )
              )
              .pipe(
                rxjs.mergeMap(() =>
                  rxjs
                    .merge(
                      components.menu.events.observe(actor.menu)($state),
                      components.menuTrigger.events.observe(actor.menuTrigger)($state),
                      components.brightnessTrigger.events.observe(actor.brightnessTrigger)($state),
                      components.cursor.events.observe(actor.cursor)($time)(w),
                      rxjs.timer(0).pipe(rxjs.mergeMap(() => components.header.events.observe(actor.header))),
                      rxjs.timer(100).pipe(rxjs.mergeMap(() => components.title.events.observe(actor.title))),
                      rxjs.timer(200).pipe(rxjs.mergeMap(() => components.footer.events.observe(actor.footer))),
                      ...pipe(
                        actor.posts,
                        ReadonlyArray.mapWithIndex((i, post) =>
                          rxjs.timer(200 + i * 150).pipe(rxjs.mergeMap(() => components.post.events.observe(post)(w)))
                        )
                      )
                    )
                    .pipe(
                      rxjs.takeUntil(
                        states.scene.selectors.excludes(['intro'])(
                          $state.pipe(
                            rxjs.map((s) => s.scene),
                            rxjs.distinctUntilChanged()
                          )
                        )
                      )
                    )
                ),
                rxjs.tap(source[1])
              ),
            states.scene.selectors.includes(['main'])(
              $state.pipe(
                rxjs.map((s) => s.scene),
                rxjs.distinctUntilChanged()
              )
            ),
            states.scene.selectors
              .includes(['outro'])(
                $state.pipe(
                  rxjs.map((s) => s.scene),
                  rxjs.distinctUntilChanged()
                )
              )
              .pipe(
                rxjs.mergeMap(() =>
                  rxjs
                    .combineLatest([
                      rxjs
                        .combineLatest([
                          components.menu.events.animation(actor.menu)(
                            $state.pipe(
                              rxjs.map((s) => s.animations),
                              rxjs.distinctUntilChanged()
                            )
                          ),
                          components.menu.events.unmount(actor.menu).pipe(rxjs.tap(source[1]))
                        ])
                        .pipe(rxjs.map(Tuple.fst), rxjs.startWith(0)),
                      rxjs
                        .combineLatest([
                          components.cursor.events.animation(actor.cursor)(
                            $state.pipe(
                              rxjs.map((s) => s.animations),
                              rxjs.distinctUntilChanged()
                            )
                          ),
                          components.cursor.events.unmount(actor.cursor).pipe(rxjs.tap(source[1]))
                        ])
                        .pipe(rxjs.map(Tuple.fst), rxjs.startWith(0)),
                      rxjs
                        .combineLatest([
                          components.footer.events.animation(actor.footer)(
                            $state.pipe(
                              rxjs.map((s) => s.animations),
                              rxjs.distinctUntilChanged()
                            )
                          ),
                          components.footer.events.unmount(actor.footer).pipe(rxjs.tap(source[1]))
                        ])
                        .pipe(rxjs.map(Tuple.fst)),
                      rxjs
                        .combineLatest([
                          components.header.events.animation(actor.header)(
                            $state.pipe(
                              rxjs.map((s) => s.animations),
                              rxjs.distinctUntilChanged()
                            )
                          ),
                          components.header.events.unmount(actor.header).pipe(rxjs.tap(source[1]))
                        ])
                        .pipe(rxjs.map(Tuple.fst)),
                      rxjs
                        .combineLatest([
                          components.title.events.animation(actor.title)(
                            $state.pipe(
                              rxjs.map((s) => s.animations),
                              rxjs.distinctUntilChanged()
                            )
                          ),
                          components.title.events.unmount(actor.title).pipe(rxjs.tap(source[1]))
                        ])
                        .pipe(rxjs.map(Tuple.fst)),
                      ...pipe(
                        actor.posts,
                        ReadonlyArray.map((post) =>
                          rxjs
                            .combineLatest([
                              components.post.events.animation(post)(
                                $state.pipe(
                                  rxjs.map((s) => s.animations),
                                  rxjs.distinctUntilChanged()
                                )
                              ),
                              components.post.events.unmount(post).pipe(rxjs.tap(source[1]))
                            ])
                            .pipe(rxjs.map(Tuple.fst))
                        )
                      )
                    ])
                    .pipe(
                      rxjs.takeUntil(
                        states.scene.selectors.excludes(['outro'])(
                          $state.pipe(
                            rxjs.map((s) => s.scene),
                            rxjs.distinctUntilChanged()
                          )
                        )
                      )
                    )
                ),
                rxjs.withLatestFrom(
                  states.history.selectors.location(
                    $state.pipe(
                      rxjs.map((s) => s.history),
                      rxjs.distinctUntilChanged()
                    )
                  )
                ),
                rxjs.filter(([ps]) => ps.every((p) => p === 0)),
                rxjs.tap(([_, l]) => (w.location.href = l.path))
              )
          ])
        )
      )
    ]);
  };
