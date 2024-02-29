import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_TOKEN} from '../../constants/constants';
import {Mapstyles as styles} from './style/Map';
import {GlobalContext} from '../../context/GlobalStates';
import {Button, Portal, Snackbar, Text} from 'react-native-paper';

MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);
MapboxGL.setWellKnownTileServer('Mapbox');

const SetLocation = ({navigation}) => {
  const [
    {location, mapView},
    {setLocation, setIsInteractionModalVisible, setMapView, setEventLocation},
  ] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  const [markerCoord, setMarkerCoord] = useState({
    latitude: 27.695,
    longitude: 85.3149,
  });
  const handleConfirmClick = () => {
    let locationData = {
      coords: {
        latitude: markerCoord.latitude,
        longitude: markerCoord.longitude,
      },
    };
    if (mapView !== 'setEventLocation') {
      setLocation(locationData);
      setIsInteractionModalVisible(true);
      setMapView('default');
    } else {
      setEventLocation(locationData);
      setMapView('default');
      navigation.navigate('Upload');
    }
  };
  console.log(mapView);
  return (
    <>
      <Portal>
        <Snackbar
          wrapperStyle={{top: 70}}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          action={{
            label: 'Okay',
            onPress: () => {
              setIsDialogVisible(false);
            },
          }}>
          Drag the pointer to set your location.
        </Snackbar>
      </Portal>
      <View style={styles.routeMapContainer}>
        <MapboxGL.MapView
          style={styles.routeMap}
          zoomEnabled={true}
          rotateEnabled={true}>
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[
              location.coords.longitude,
              location.coords.latitude,
            ]}
            animationMode={'flyTo'}
            animationDuration={8000}
          />
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={[markerCoord.longitude, markerCoord.latitude]}
            draggable
            onDragEnd={e =>
              setMarkerCoord({
                latitude: e.geometry.coordinates[1],
                longitude: e.geometry.coordinates[0],
              })
            }
          />
        </MapboxGL.MapView>
        <View style={styles.setLocationContainer}>
          <Button
            mode="contained"
            buttonColor="rgba(0, 0, 0, 0.4)"
            onPress={() => {
              handleConfirmClick();
            }}>
            Confirm Location
          </Button>
        </View>
      </View>
    </>
  );
};

export default SetLocation;
