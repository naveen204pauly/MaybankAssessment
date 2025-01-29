import {AppDispatch, RootState} from '../../store';
import {
  fetchPlacesStart,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  fetchPlaceDetailStart,
  fetchPlaceDetailSuccess,
  fetchPlaceDetailFailure,
} from './placesSlice';
import {
  getAutocompleteResults,
  getPlaceDetailsResults,
} from '../../../services/placeApi';

export const fetchPlaces =
  (query: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    // Check cache first
    const cachedResults = getState().places.cachedPlaces[query];
    if (cachedResults) return;

    dispatch(fetchPlacesStart());
    try {
      const results = await getAutocompleteResults(query);
      dispatch(fetchPlacesSuccess({query, results}));
    } catch (error: any) {
      dispatch(fetchPlacesFailure(error.message));
    }
  };
export const fetchPlaceDetail =
  (placeId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPlaceDetailStart());
    try {
      const geoemtry = await getPlaceDetailsResults(placeId);
      dispatch(fetchPlaceDetailSuccess({placeId, geoemtry}));
    } catch (error: any) {
      dispatch(fetchPlaceDetailFailure(error.message));
    }
  };
