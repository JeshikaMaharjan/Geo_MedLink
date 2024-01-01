import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../Map/Map';
import Nearby from '../Map/Nearby';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {useEffect} from 'react';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={Map} />
      {/* <Tab.Screen name="Search" component={Nearby} /> */}
    </Tab.Navigator>
  );
}
