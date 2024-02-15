import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, {useContext, useEffect} from 'react';
import {Mapstyles as styles} from './style/Map';
import {MAPBOX_TOKEN} from '../../constants/constants';
import {
  ActivityIndicator,
  Badge,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';
import useHelperFunctions from './utils/helper';
import MapActions from './MapActions';
import InteractionModal from './InteractionModal';
import FindNearby from './FindNearby';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);

export default function Map({route, navigation}) {
  const [{location, mapView, isIncoming}] = useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  const [{isInteractionModalVisible}, {setIsInteractionModalVisible}] =
    useContext(GlobalContext);

  useEffect(() => {
    getLocation();
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Badge
            visible={isIncoming}
            size={10}
            style={{position: 'absolute', top: 10, right: 12}}
          />
          <IconButton
            icon="bell"
            onPress={() => {
              navigation.navigate('Notification');
            }}
            color="#fff"
          />
        </View>
      ),
    });
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
                <MapboxGL.PointAnnotation
                  id="marker"
                  coordinate={[
                    location.coords.longitude,
                    location.coords.latitude,
                  ]}
                />
              </MapboxGL.MapView>
            ) : (
              // <View>
              //   <Text>map</Text>
              // </View>
              <FindNearby />
            )}

            <MapActions />
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
