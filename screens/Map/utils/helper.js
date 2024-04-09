import {useContext, useState} from 'react';
import {GlobalContext} from '../../../context/GlobalStates';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const useHelperFunctions = () => {
  const [
    {location, baseURL},
    {setLocation, setMapView, setBloodDonorsLocation, setAmbulancesLocation},
  ] = useContext(GlobalContext);

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
  };
  // const data = [
  //   {id: 4, user: {latitude: 27.67414, longitude: 85.32109}},
  //   {id: 7, user: {latitude: 27.6954, longitude: 85.3039}},
  //   {id: 11, user: {latitude: 27.695, longitude: 85.3149}},
  // ];

  async function getBloodDonorsLocation() {
    try {
      const res = await axios.get(`${baseURL}/active/bloodDonors`);
      setBloodDonorsLocation(res.data.data);
      // setBloodDonorsLocation(data);
      setMapView('donor');
    } catch (err) {
      console.log(err);
    }
  }
  async function getAmbulanceLocation() {
    try {
      const res = await axios.get(`${baseURL}/active/ambulance`);
      setAmbulancesLocation(res.data.data);
      setMapView('ambulance');
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getLocation,
    getBloodDonorsLocation,
    getAmbulanceLocation,
  };
};

export default useHelperFunctions;
