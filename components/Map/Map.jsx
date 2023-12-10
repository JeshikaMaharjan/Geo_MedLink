import {Text, StyleSheet, View, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@rnmapbox/maps';
import {useEffect, useState} from 'react';
// import Hooks from '../custom_hooks/hooks';
import {MAPBOX_TOKEN} from '../../constants/constants';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === 'granted';
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function Map() {
  const [location, setLocation] = useState(false);
  // const {getLocation} = Hooks();

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  useEffect(() => {
    getLocation();
  }, []);
  console.log('$$$', location);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {location != false && (
          <>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera
                zoomLevel={15}
                centerCoordinate={[
                  location.coords.longitude,
                  location.coords.latitude,
                ]}
                animationMode={'flyTo'}
                animationDuration={8000}
              />
              <MapboxGL.PointAnnotation
                id="marker"
                coordinate={[
                  location.coords.longitude,
                  location.coords.latitude,
                ]}>
                {/* <View /> */}
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
            <Button title="Relocate" onPress={getLocation} />
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: 200,
    width: '100%',
    flex: 1,
  },
  map: {
    // flex: 1,
    height: '80%',
  },
});
