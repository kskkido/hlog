import * as lib from '/modules/lib/index.js';
import * as featuredPostRecord from '../../featuredPostRecord/index.js';
import * as orientationRecord from '../../orientationRecord/index.js';
import * as postFilterRecord from '../../postFilterRecord/index.js';
import * as postMetadataRecord from '../../postMetadataRecord/index.js';
import * as tagMetadataRecord from '../../tagMetadataRecord/index.js';

export const initialState = {
  featuredPostRecord: featuredPostRecord.reducers.initialState,
  orientationRecord: orientationRecord.reducers.initialState,
  postFilterRecord: postFilterRecord.reducers.initialState,
  postMetadataRecord: postMetadataRecord.reducers.initialState,
  tagMetadataRecord: tagMetadataRecord.reducers.initialState,
};

export const main = lib.store.reducer.combine(
  {
    featuredPostRecord: featuredPostRecord.reducers.main,
    orientationRecord: orientationRecord.reducers.main,
    postFilterRecord: postFilterRecord.reducers.main,
    postMetadataRecord: postMetadataRecord.reducers.main,
    tagMetadataRecord: tagMetadataRecord.reducers.main,
  },
  initialState
);
