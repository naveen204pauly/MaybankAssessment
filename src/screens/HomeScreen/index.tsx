import React, {useCallback, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import {AutoCompleteInput} from '../../components/AutoComplete';
import {Place} from '../../services/placeApi';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {
  fetchPlaceDetail,
  fetchPlaces,
} from '../../redux/features/places/placesThunks';
import {
  selectError,
  selectGeometry,
  selectLoading,
  selectSearchHistory,
  selectSearchResults,
} from '../../redux/features/places/placesSelectors';
import useDebounce from '../../hooks/useDebounce';
import {DEFAULT_COORDINATE} from '../../constants/common.constants';
import {CustomMapView} from '../../components/CustomMapView';
import {shallowEqual} from 'react-redux';

export const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [selecedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [coordinate, setCoordinate] = useState(DEFAULT_COORDINATE);

  const loading = useAppSelector(selectLoading, shallowEqual);
  const error = useAppSelector(selectError, shallowEqual);
  const searchResult = useAppSelector(selectSearchResults(query), shallowEqual);
  const geometry = useAppSelector(
    selectGeometry(selecedPlace?.id ?? ''),
    shallowEqual,
  );
  const searchHistory = useAppSelector(selectSearchHistory, shallowEqual);
  const dispatch = useAppDispatch();

  //Side Effects
  useEffect(() => {
    if (error) {
      Alert.alert('Google Place Error', error, [
        {
          text: 'Dismiss',
          style: 'cancel',
        },
      ]);
    }
  }, [error]);

  const updateCoordinates = useCallback((lat: number, lng: number) => {
    setCoordinate({latitude: lat, longitude: lng});
  }, []);

  useEffect(() => {
    if (selecedPlace && !geometry) {
      dispatch(fetchPlaceDetail(selecedPlace));
    } else if (geometry) {
      updateCoordinates(geometry.location.lat, geometry.location.lng);
    }
  }, [dispatch, geometry, selecedPlace, updateCoordinates]);

  const onSelectPlace = useCallback((place: Place) => {
    setSelectedPlace(place);
    setQuery(place.title);
  }, []);

  //Event Handlers
  const debouncedSearch = useDebounce(
    useCallback(
      (searchTerm: string) => {
        dispatch(fetchPlaces(searchTerm));
      },
      [dispatch],
    ),
    500,
  );

  const handleChange = useCallback(
    (text: string) => {
      setQuery(text);
      if (text) {
        debouncedSearch(text);
      }
    },
    [debouncedSearch],
  );

  return (
    <React.Fragment>
      <View style={styles.container}>
        <CustomMapView coordinate={coordinate} />
        <SafeAreaView>
          <AutoCompleteInput
            placeholder="Search here"
            query={query}
            onSelect={place => onSelectPlace(place)}
            loading={loading}
            onChange={handleChange}
            onClear={() => setQuery('')}
            onSelectHistory={history => setQuery(history)}
            history={searchHistory}
            suggestions={searchResult}
          />
        </SafeAreaView>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
