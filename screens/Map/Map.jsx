import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, {useContext, useEffect, useState} from 'react';
import {Mapstyles as styles} from './style/Map';
import {MAPBOX_TOKEN} from '../../constants/constants';
import {
  ActivityIndicator,
  Button,
  Card,
  Searchbar,
  Text,
} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';
import useHelperFunctions from './utils/helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import FontistoIcon from 'react-native-vector-icons/FontistoIcon';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);

export default function Map() {
  const [{location}, {setLocation}] = useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    console.log(query);
  };

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
            <View style={styles.bottomView}>
              <View style={styles.searchBoxView}>
                <Searchbar
                  placeholder="Search location"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  style={styles.searchBox}
                />
                <FontAwesomeIcon
                  name="street-view"
                  size={40}
                  onPress={getLocation}
                  color="#1E3050"
                />
              </View>
              <Text variant="titleMedium" style={{color: '#1E3050'}}>
                Find Nearby
              </Text>
              <View style={{flexDirection: 'row', gap: 15}}>
                <View style={styles.nearbyContainer}>
                  <Card style={styles.iconContainer}>
                    <MaterialIcons name="bloodtype" size={40} color="#1E3050" />
                  </Card>
                  <Card style={styles.iconContainer}>
                    <FontAwesomeIcon
                      name="ambulance"
                      size={40}
                      color="#1E3050"
                    />
                  </Card>
                </View>
                <Card style={styles.buttonContainer}>
                  <Button

                  // onPress={() => {
                  //   pass;
                  // }}
                  >
                    Send Request
                  </Button>
                </Card>
              </View>
            </View>
          </>
          // ------------------------------------
          // <>
          //   <MapboxGL.MapView style={styles.map}>
          //     <MapboxGL.Camera
          //       zoomLevel={15}
          //       centerCoordinate={[
          //         location.coords.longitude,
          //         location.coords.latitude,
          //       ]}
          //       animationMode={'flyTo'}
          //       animationDuration={8000}
          //     />
          //     <MapboxGL.PointAnnotation
          //       id="marker"
          //       coordinate={[
          //         location.coords.longitude,
          //         location.coords.latitude,
          //       ]}
          //     />
          //   </MapboxGL.MapView>
          // </>
        )}
      </View>
    </View>
  );
}
