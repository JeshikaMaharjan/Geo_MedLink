import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList, Text, Image} from 'react-native';
import MapboxGL, {MarkerView} from '@rnmapbox/maps';
import userMarker from '../../assets/userMarker.png';
import {MAPBOX_TOKEN} from '../../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GlobalContext} from '../../context/GlobalStates';
import axios from 'axios';
import {Mapstyles as styles} from './style/Map';
import {Button} from 'react-native-paper';

MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setConnected(true);
MapboxGL.setWellKnownTileServer('Mapbox');

const routeProfiles = [
  {id: 'walking', label: 'Walking', icon: 'walking'},
  {id: 'cycling', label: 'Cycling', icon: 'bicycle'},
  {id: 'driving', label: 'Driving', icon: 'car'},
];
const RouteBetweenUsers = ({navigation}) => {
  const [routeDirections, setRouteDirections] = useState(null);
  const [{location, confirmedUserLocation}, {setMapView}] =
    useContext(GlobalContext);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedRouteProfile, setselectedRouteProfile] = useState('walking');

  useEffect(() => {
    if (selectedRouteProfile !== null) {
      createRouterLine(location, selectedRouteProfile);
    }
  }, [selectedRouteProfile]);

  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(userLocation, routeProfile) {
    const startCoords = `${userLocation.coords.longitude},${userLocation.coords.latitude}`;
    const endCoords = `${confirmedUserLocation.coords.longitude},${confirmedUserLocation.coords.latitude}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?geometries=geojson&steps=true&banner_instructions=true&overview=full&access_token=${MAPBOX_TOKEN}`;

    try {
      let res = await axios.get(url);
      let response = res.data;

      response.routes.map(data => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = response?.routes[0]?.geometry?.coordinates;
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
    } catch (e) {
      console.log(e);
    }
    console.log({distance});
    console.log({duration});
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.routeProfileButton,
        item.id == selectedRouteProfile && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setselectedRouteProfile(item.id)}>
      <Icon
        name={item.icon}
        size={24}
        color={
          item.id == selectedRouteProfile ? 'white' : 'rgba(255,255,255,0.6)'
        }
      />
      <Text
        style={[
          styles.routeProfileButtonText,
          item.id == selectedRouteProfile &&
            styles.selectedRouteProfileButtonText,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.routeMapContainer}>
      <MapboxGL.MapView
        style={styles.routeMap}
        zoomEnabled={true}
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(location, selectedRouteProfile);
        }}>
        <MapboxGL.Camera
          zoomLevel={13}
          centerCoordinate={[
            location.coords.longitude,
            location.coords.latitude,
          ]}
          animationMode={'flyTo'}
          animationDuration={8000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {confirmedUserLocation && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={[
              confirmedUserLocation.coords.longitude,
              confirmedUserLocation.coords.latitude,
            ]}>
            <View style={styles.destinationIcon}>
              <Ionicons name="location-outline" size={30} color="#E1710A" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        <MarkerView
          id="marker"
          coordinate={[location.coords.longitude, location.coords.latitude]}
          anchor={{x: 0.5, y: 1}}>
          <Image source={userMarker} style={{width: 60, height: 60}} />
        </MarkerView>
      </MapboxGL.MapView>
      <View style={styles.buttonView}>
        <Button
          mode="contained"
          buttonColor="rgba(0, 0, 0, 0.4)"
          onPress={() => {
            setMapView('default');
          }}>
          Exit Location View
        </Button>
      </View>
      <FlatList
        data={routeProfiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.routeProfileList}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

export default RouteBetweenUsers;
