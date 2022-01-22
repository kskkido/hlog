import * as lib from 'lib';
import * as cursor from '../../cursor';
import * as history from '../../history';
import * as phase from '../../phase';
import * as postFilter from '../../postFilter';
import * as postMetadataRecord from '../../postMetadataRecord';
import * as scroll from '../../scroll';
import * as tagFilter from '../../tagFilter';
import * as tagMetadataRecord from '../../tagMetadataRecord';

export type Action =
  | cursor.actions.Action
  | history.actions.Action
  | phase.actions.Action
  | postFilter.actions.Action
  | postMetadataRecord.actions.Action
  | scroll.actions.Action
  | tagFilter.actions.Action
  | tagMetadataRecord.actions.Action
  | typeof lib.store.action.noop;
