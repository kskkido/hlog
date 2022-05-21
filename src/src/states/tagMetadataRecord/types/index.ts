import * as t from 'io-ts';
import * as models from 'models';

export const State = models.tagMetadataRecord.types.TagMetadataRecord;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('tagMetadataRecord/set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;
