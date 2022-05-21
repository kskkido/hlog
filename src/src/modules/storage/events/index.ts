import * as rxjs from 'rxjs';
import * as models from 'models';
import * as states from 'states';

export const observe =
  (
    $state: rxjs.Observable<{
      brightness?: states.brightness.types.State;
      postFilter?: states.postFilter.types.State;
      tagFilter?: states.tagFilter.types.State;
    }>
  ) =>
  (w: Window) => {
    return $state.pipe(
      rxjs.tap((state) => {
        models.storage.lib.put(state)(w)();
      })
    );
  };
