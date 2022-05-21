import * as t from 'io-ts';
import * as phase from 'models/phase';
import * as phaseConfig from 'models/phaseConfig';

export const PhaseElementConfig = t.record(
  phase.types.Phase,
  t.union([phaseConfig.types.PhaseConfig, t.null])
);

export type PhaseElementConfig = t.TypeOf<typeof PhaseElementConfig>;
