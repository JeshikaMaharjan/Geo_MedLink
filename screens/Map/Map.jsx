import React, {useContext, useEffect} from 'react';
import {Image, View} from 'react-native';
import MapboxGL, {MarkerView} from '@rnmapbox/maps';
import {ActivityIndicator, Modal, Portal, Text} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';
import useHelperFunctions from './utils/helper';
import MapActions from './MapActions';
import InteractionModal from './InteractionModal';
import FindNearby from './FindNearby';
import Icon from '../Notifications/Icon';
import userMarker from '../../assets/userMarker.png';
import RouteBetweenUsers from './RouteBetweenUsers';
import {MAPBOX_TOKEN} from '../../constants/constants';
import {Mapstyles as styles} from './style/Map';
import SetLocation from './SetLocation';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);

export default function Map({navigation}) {
  const [
    {location, confirmedUserLocation, mapView, isInteractionModalVisible},
    {setIsInteractionModalVisible},
  ] = useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();

  useEffect(() => {
    getLocation();
  }, []);

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
            <View style={styles.mapHeader}>
              <Text variant="titleLarge">Map</Text>
              <Icon navigation={navigation} />
            </View>
            {mapView === 'default' ? (
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
                <MarkerView
                  id="marker"
                  coordinate={[
                    location.coords.longitude,
                    location.coords.latitude,
                  ]}
                  anchor={{x: 0.5, y: 1}}>
                  <Image source={userMarker} style={{width: 60, height: 60}} />
                </MarkerView>

                {confirmedUserLocation && mapView === 'confirmedUser' && (
                  <MapboxGL.PointAnnotation
                    id="marker"
                    coordinate={[
                      confirmedUserLocation.coords.longitude,
                      confirmedUserLocation.coords.latitude,
                    ]}
                  />
                )}
              </MapboxGL.MapView>
            ) : (
              <>
                {mapView === 'confirmedUser' ? (
                  <RouteBetweenUsers />
                ) : mapView === 'setLocation' ||
                  mapView === 'setEventLocation' ? (
                  <SetLocation navigation={navigation} />
                ) : (
                  <FindNearby />
                )}
              </>
            )}

            {mapView !== 'confirmedUser' &&
              mapView !== 'setLocation' &&
              mapView !== 'setEventLocation' && <MapActions />}
            <Portal>
              <Modal
                visible={isInteractionModalVisible}
                onDismiss={() => {
                  setIsInteractionModalVisible(false);
                }}
                contentContainerStyle={styles.modalContainer}>
                <InteractionModal navigation={navigation} />
              </Modal>
            </Portal>
          </>
        )}
      </View>
    </View>
  );
}
