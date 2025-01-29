import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Place} from '../../../services/placeApi';

export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  id: string;
}

interface PlacesState {
  geometry: Record<string, Geometry>;
  cachedPlaces: Record<string, Place[]>; // Cache for search results
  searchHistory: string[]; // List of searches
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  geometry: {},
  cachedPlaces: {},
  searchHistory: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    fetchPlacesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlacesSuccess(
      state,
      action: PayloadAction<{query: string; results: Place[]}>,
    ) {
      const {query, results} = action.payload;
      state.loading = false;
      state.cachedPlaces[query] = results; // Cache results
      state.searchHistory.unshift(query);
    },
    fetchPlacesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPlaceDetailStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlaceDetailSuccess(
      state,
      action: PayloadAction<{placeId: string; geoemtry: Geometry}>,
    ) {
      const {placeId, geoemtry} = action.payload;
      state.loading = false;
      state.geometry[placeId] = geoemtry;
    },
    fetchPlaceDetailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlacesStart,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  fetchPlaceDetailStart,
  fetchPlaceDetailSuccess,
  fetchPlaceDetailFailure,
} = placesSlice.actions;
export default placesSlice.reducer;
