import {createDrawerNavigator} from '@react-navigation/drawer';
import Nearby from './Map/Nearby';
import Map from './Map/Map';

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Map" component={Map} />
      {/* <Drawer.Screen name="Search" component={Nearby} /> */}
    </Drawer.Navigator>
  );
}
