import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as state from '../state';

export type State = state.root.reducers.State;

export type Action = state.root.actions.Action;

export type Store = lib.store.types.Store<rxjs.Observable<State>, Action>;

export type Dispatch = lib.store.types.Dispatch<Action>;
