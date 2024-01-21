import {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default function Hooks() {
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

  const [location, setLocation] = useState(false);

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
      return location;
    });
  };
  return {getLocation};
}
