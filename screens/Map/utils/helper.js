import {useContext, useState} from 'react';
import {GlobalContext} from '../../../context/GlobalStates';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const useHelperFunctions = () => {
  const [{location}, {setLocation}] = useContext(GlobalContext);

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

  return {
    getLocation,
  };
};

export default useHelperFunctions;
