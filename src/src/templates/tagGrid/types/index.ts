import * as models from 'models';

export type Props = {
  id: string;
  tags: ReadonlyArray<models.tagMetadata.types.TagMetadata>;
};
