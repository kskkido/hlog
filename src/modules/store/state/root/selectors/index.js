export const makeSelectFeaturedPostRecord = () => (state) => {
  return state.featuredPostRecord;
};

export const makeSelectOrientationRecord = () => (state) => {
  return state.orientationRecord;
};

export const makeSelectPostFilterRecord = () => (state) => {
  return state.postFilterRecord;
};

export const makeSelectPostMetadataRecord = () => (state) => {
  return state.postMetadataRecord;
};

export const makeSelectTagMetadataRecord = () => (state) => {
  return state.tagMetadataRecord;
};
