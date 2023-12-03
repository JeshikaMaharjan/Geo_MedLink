import {PermissionsAndroid} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Map from './Map';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';

// MapboxGL.setWellKnownTileServer('Mapbox');
// MapboxGL.setAccessToken(
//   'pk.eyJ1Ijoia2NwcmVtIiwiYSI6ImNscGp0cjN4ZzAyeHoyanBjcTg1cHg4Z3oifQ.mF_otRgUhIMfKYdMIouEbg',
// );
// MapboxGL.setConnected(true);

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     return granted === 'granted';
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  const [location, setLocation] = useState(false);
  // const {getLocation} = Hooks();

  // const getLocation = () => {
  //   const result = requestLocationPermission();
  //   result.then(res => {
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           setLocation(position);
  //         },
  //         error => {
  //           console.log(error.code, error.message);
  //           setLocation(false);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  //   console.log(location);
  // };
  // useEffect(() => {
  //   getLocation();
  // }, []);
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Map" component={() => <Map data={location} />} /> */}
      <Drawer.Screen name="Map" component={Map} />
    </Drawer.Navigator>
  );
}
