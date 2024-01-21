import React, {useContext, useEffect, useState} from 'react';
import MapboxGL from '@rnmapbox/maps';
import {Image, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';
import {Mapstyles as styles} from './style/Map';
import {Text} from 'react-native-paper';
import axios from 'axios';
import {MAPBOX_TOKEN} from '../../constants/constants';

// const data = [
//   {
//     id: 1,
//     coords: {
//       latitude: 27.6923169,
//       longitude: 85.313993,
//     },
//   },
//   {
//     id: 2,
//     coords: {
//       latitude: 27.692911,
//       longitude: 85.314293,
//     },
//   },
//   {
//     id: 3,
//     coords: {
//       latitude: 27.690027,
//       longitude: 85.318948,
//     },
//   },
// ];

const FindNearby = () => {
  const [{location, mapView, searchCoords}] = useContext(GlobalContext);
  const [data, setData] = useState();

  useEffect(() => {
    console.log(mapView);
    if (mapView === 'search') {
      setData([
        {
          id: 1,
          coords: {longitude: searchCoords[0], latitude: searchCoords[1]},
        },
      ]);
    }
    //api hit logic
  }, [mapView, searchCoords]);

  return (
    // <View style={styles.map}>
    //   <Text>dfdf</Text>
    // </View>
    <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera
        zoomLevel={15}
        centerCoordinate={[location.coords.longitude, location.coords.latitude]}
        animationMode={'flyTo'}
        animationDuration={8000}
      />
      {!!data && (
        <>
          {data.map(val => (
            <>
              {console.log('val', val)}
              <MapboxGL.PointAnnotation
                key={val.id.toString()}
                id={`marker_${val.id}`}
                coordinate={[val.coords.longitude, val.coords.latitude]}
              />
            </>
          ))}
        </>
      )}
    </MapboxGL.MapView>
  );
};

export default FindNearby;
