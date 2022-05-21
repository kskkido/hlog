import * as t from 'io-ts';
import * as models from 'models';

export const State = models.postMetadataRecord.types.PostMetadataRecord;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('postMetadataRecord/set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;
