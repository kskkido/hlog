import * as rxjs from 'rxjs';
import * as stores from 'stores';
import * as modules from 'modules';
import * as scenes from 'scenes';

export const main = (w: Window) => {
  const $time = rxjs.interval(0, rxjs.animationFrameScheduler).pipe(rxjs.share());
  const store = stores.main(stores.state.root.reducers.initialState)(stores.config.empty);
  return rxjs
    .combineLatest([
      scenes.preload.main($time)(store)(w),
      scenes.intro.main($time)(store)(w),
      scenes.outro.main($time)(store)(w),
      modules.scroll.main($time)(store)(w),
      modules.navigation.main(store)(w)
    ])
    .subscribe();
};
