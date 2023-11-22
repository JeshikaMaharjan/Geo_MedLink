import {Text} from 'react-native';
import Map from './Map';

import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Map" component={Map} />
    </Drawer.Navigator>
  );
}
