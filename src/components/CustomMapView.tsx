import React, {FC} from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

type CustomMapViewProps = {
  coordinate: {latitude: number; longitude: number};
};

export const CustomMapView: FC<CustomMapViewProps> = ({coordinate}) => (
  <MapView
    zoomEnabled
    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
    style={styles.map}
    region={{
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    <Marker coordinate={coordinate} />
  </MapView>
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
