import { constant, identity, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{
      animations: states.animations.types.State;
      tagFilter: states.tagFilter.types.State;
    }>
  ) => {
    return rxjs.merge(
      animate(e)(
        $state.pipe(
          rxjs.map((s) => s.animations),
          rxjs.distinctUntilChanged()
        )
      ),
      fields(e)(
        $state.pipe(
          rxjs.map((s) => s.tagFilter),
          rxjs.distinctUntilChanged()
        )
      )
    );
  };

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return rxjs
      .combineLatest(
        pipe(
          elements.content.from.element(e),
          ReadonlyArray.map((c) =>
            pipe(
              states.animations.selectors
                .lookup(lib.element.to.identifier(c))($state)
                .pipe(
                  rxjs.tap(
                    pipe(
                      lib.animation.concat([models.animation.constants.slideInBottom(c)]),
                      lib.frp.behavior.contramap(lib.time.lerpish)
                    )
                  )
                )
            )
          )
        )
      )
      .pipe(rxjs.map(constant(null)));
  };

export const fields = (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.tagFilter.types.State>) => {
  return rxjs.merge(view(e)($state), sort(e)($state), order(e)($state)).pipe(rxjs.map(constant(null)));
};

export const view = (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.tagFilter.types.State>) => {
  return $state.pipe(
    rxjs.map((state) => state.view),
    rxjs.distinctUntilChanged(),
    rxjs.tap((value) => {
      const { left: lxs, right: rxs } = pipe(
        elements.tagFilter.to.tagViewWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagViewWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.partition((x) => x.dataset.value === value)
      );
      lxs.forEach((x) => {
        x.classList.remove('active');
        x.classList.add('inactive');
      });
      rxs.forEach((x) => {
        x.classList.remove('inactive');
        x.classList.add('active');
      });
    })
  );
};

export const sort = (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.tagFilter.types.State>) => {
  return $state.pipe(
    rxjs.map((state) => state.sort),
    rxjs.distinctUntilChanged(),
    rxjs.tap((value) => {
      const { left: lxs, right: rxs } = pipe(
        elements.tagFilter.to.tagSortWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagSortWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.partition((x) => x.dataset.value === value)
      );
      lxs.forEach((x) => {
        x.classList.remove('active');
        x.classList.add('inactive');
      });
      rxs.forEach((x) => {
        x.classList.remove('inactive');
        x.classList.add('active');
      });
    })
  );
};

export const order = (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.tagFilter.types.State>) => {
  return $state.pipe(
    rxjs.map((state) => state.order),
    rxjs.distinctUntilChanged(),
    rxjs.tap((value) => {
      const { left: lxs, right: rxs } = pipe(
        elements.tagFilter.to.tagOrderWidget(e),
        ReadonlyArray.fromOptionK(Option.map(elements.tagOrderWidget.to.inputs)),
        ReadonlyArray.chain(identity),
        ReadonlyArray.partition((x) => x.dataset.value === value)
      );
      lxs.forEach((x) => {
        x.classList.remove('active');
        x.classList.add('inactive');
      });
      rxs.forEach((x) => {
        x.classList.remove('inactive');
        x.classList.add('active');
      });
    })
  );
};
