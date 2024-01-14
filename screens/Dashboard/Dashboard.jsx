import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../Map/Map';
import Nearby from '../Map/Nearby';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context/GlobalStates';
import InteractionModal from '../Map/InteractionModal';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  const [, {setIsIncoming, setIncomingRequest, setIsInteractionModalVisible}] =
    useContext(GlobalContext);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsIncoming(true);
      console.log('incoming', remoteMessage);
      setIncomingRequest(remoteMessage.data.body);
      setIsInteractionModalVisible(true);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
        {/* <Tab.Screen name="Search" component={Nearby} /> */}
      </Tab.Navigator>
      <InteractionModal />
    </>
  );
}
