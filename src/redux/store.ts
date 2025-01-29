import {configureStore} from '@reduxjs/toolkit';
import placesReducer from './features/places/placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
