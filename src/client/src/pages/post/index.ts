import * as rxjs from 'rxjs';
import * as stores from 'stores';
import * as modules from 'modules';

export const main = (w: Window) => {
  const $time = rxjs.interval(0, rxjs.animationFrameScheduler).pipe(rxjs.share());
  const store = stores.main(stores.state.root.reducers.initialState)(stores.config.empty);
  return rxjs.combineLatest([modules.scroll.main($time)(store)(w)]).subscribe();
};
