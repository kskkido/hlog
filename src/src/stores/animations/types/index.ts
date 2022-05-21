import * as animation from 'stores/animation';
import * as rxjs from 'rxjs';

export type State = Record<string, animation.types.Store>;

export type SetAction = {
  type: 'set';
  payload: {
    key: string;
    value: animation.types.Store;
  };
};

export type Action = SetAction;

export type Store = readonly [rxjs.Observable<State>, (actions: ReadonlyArray<Action>) => void];
