import {RootState} from '../../store';

export const selectSearchHistory = (state: RootState) =>
  state.places.searchHistory;
//Curried Selector
export const selectSearchResults = (query: string) => (state: RootState) =>
  state?.places?.cachedPlaces[query] ?? [];
export const selectGeometry = (placeId: string) => (state: RootState) =>
  state.places.geometry[placeId];
export const selectLoading = (state: RootState) => state.places.loading;
export const selectError = (state: RootState) => state.places.error;
