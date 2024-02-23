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
  const data = [
    {
      id: 1,
      coords: {
        latitude: 27.6923169,
        longitude: 85.313993,
      },
    },
    {
      id: 2,
      coords: {
        latitude: 27.692911,
        longitude: 85.314293,
      },
    },
    {
      id: 3,
      coords: {
        latitude: 27.690027,
        longitude: 85.318948,
      },
    },
  ];

  async function getBloodDonorsLocation() {
    try {
      // const res = await axios.get(`http://${baseURL}/api/active/bloodDonors`);
      // console.log(res.data);
      // setBloodDonorsLocation(res.data);
      setBloodDonorsLocation(data);
      setMapView('donor');
    } catch (err) {
      console.log(err);
    }
  }
  async function getAmbulanceLocation() {
    try {
      // const res = await axios.get(`http://${baseURL}/api/active/ambulance`);
      // console.log(res.data);
      // setAmbulancesLocation(res.data);
      setAmbulancesLocation(data);
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
