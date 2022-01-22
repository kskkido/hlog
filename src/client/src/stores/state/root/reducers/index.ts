import * as lib from 'lib';
import * as cursor from '../../cursor';
import * as history from '../../history';
import * as phase from '../../phase';
import * as postFilter from '../../postFilter';
import * as postMetadataRecord from '../../postMetadataRecord';
import * as scroll from '../../scroll';
import * as tagFilter from '../../tagFilter';
import * as tagMetadataRecord from '../../tagMetadataRecord';

export type State = {
  cursor: cursor.reducers.State;
  history: history.reducers.State;
  phase: phase.reducers.State;
  postFilter: postFilter.reducers.State;
  postMetadataRecord: postMetadataRecord.reducers.State;
  scroll: scroll.reducers.State;
  tagFilter: tagFilter.reducers.State;
  tagMetadataRecord: tagMetadataRecord.reducers.State;
};

export const initialState = {
  cursor: cursor.reducers.initialState,
  history: history.reducers.initialState,
  phase: phase.reducers.initialState,
  postFilter: postFilter.reducers.initialState,
  postMetadataRecord: postMetadataRecord.reducers.initialState,
  scroll: scroll.reducers.initialState,
  tagFilter: tagFilter.reducers.initialState,
  tagMetadataRecord: tagMetadataRecord.reducers.initialState
};

export const main = lib.store.reducer.combine<State>(
  {
    cursor: cursor.reducers.main,
    history: history.reducers.main,
    phase: phase.reducers.main,
    postFilter: postFilter.reducers.main,
    postMetadataRecord: postMetadataRecord.reducers.main,
    scroll: scroll.reducers.main,
    tagFilter: tagFilter.reducers.main,
    tagMetadataRecord: tagMetadataRecord.reducers.main
  },
  initialState
);
