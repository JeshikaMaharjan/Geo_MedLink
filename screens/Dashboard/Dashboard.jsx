import {createDrawerNavigator} from '@react-navigation/drawer';
import Map from '../Map/Map';
import Nearby from '../Map/Nearby';

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Map" component={Map} />
      {/* <Drawer.Screen name="Search" component={Nearby} /> */}
    </Drawer.Navigator>
  );
}
