import React, {useContext, useEffect, useState} from 'react';
import MapboxGL, {MarkerView} from '@rnmapbox/maps';
import {Image} from 'react-native';

import {GlobalContext} from '../../context/GlobalStates';
import {Mapstyles as styles} from './style/Map';
import ambulanceMarker from '../../assets/ambulanceMarker.png';
import donorMarker from '../../assets/donorMarker.png';
import searchMarker from '../../assets/marker.png';

const FindNearby = () => {
  const [
    {location, mapView, searchCoords, bloodDonorsLocation, ambulancesLocation},
  ] = useContext(GlobalContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    let newData = [];

    switch (mapView) {
      case 'search':
        newData = [
          {
            id: 1,
            coords: {longitude: searchCoords[0], latitude: searchCoords[1]},
          },
        ];
        break;
      case 'donor':
        newData = bloodDonorsLocation;
        break;
      case 'ambulance':
        newData = ambulancesLocation;
        break;
      default:
        newData = [];
        break;
    }

    setData(newData);
  }, [mapView, searchCoords, bloodDonorsLocation, ambulancesLocation]);

  return (
    <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera
        zoomLevel={15}
        centerCoordinate={[location.coords.longitude, location.coords.latitude]}
        animationMode={'flyTo'}
        animationDuration={8000}
      />
      {!!data &&
        data.map(val => (
          <MarkerView
            key={val.id.toString()}
            id={`marker_${val.id}`}
            coordinate={[val.coords.longitude, val.coords.latitude]}
            anchor={{x: 0.5, y: 1}}>
            <Image
              source={
                mapView === 'search'
                  ? searchMarker
                  : mapView === 'donor'
                  ? donorMarker
                  : ambulanceMarker
              }
              style={{width: 30, height: 30}}
            />
          </MarkerView>
        ))}
    </MapboxGL.MapView>
  );
};

export default FindNearby;
