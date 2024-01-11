import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, {useContext, useEffect} from 'react';
import {Mapstyles as styles} from './style/Map';
import {MAPBOX_TOKEN} from '../../constants/constants';
import {ActivityIndicator, Portal, Text} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';
import useHelperFunctions from './utils/helper';
import MapActions from './MapActions';
import InteractionModal from './InteractionModal';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);

export default function Map() {
  const [{location, isInteractionModalVisible}, {setLocation}] =
    useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  useEffect(() => {
    getLocation();
  }, []);
  console.log('$$$', location);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {location === false ? (
          <View style={styles.loader}>
            <ActivityIndicator animating={true} size={'large'} />
            <Text>Fetching your location. Please wait.</Text>
          </View>
        ) : (
          <>
            <View style={styles.map}>
              <Text>djjddj</Text>
            </View>
            {/* <MapboxGL.MapView style={styles.map}>
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
                ]}
              />
            </MapboxGL.MapView> */}
            <MapActions />
          </>
        )}
      </View>
      <Portal>
        <InteractionModal />
      </Portal>
    </View>
  );
}
