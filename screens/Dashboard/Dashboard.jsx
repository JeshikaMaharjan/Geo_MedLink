import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalStates';
import {Portal, Snackbar} from 'react-native-paper';
import uuid from 'react-native-uuid';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  const [{NotificationDb}, {setIsIncoming}] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsIncoming(true);
      setIsDialogVisible(true);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: () => (
              <FontAwesomeIcon name="map-o" color="black" size={15} />
            ),
          }}
        />
      </Tab.Navigator>
      <Portal>
        <Snackbar
          wrapperStyle={{top: 70}}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          action={{
            label: 'Okay',
            onPress: () => {
              setIsDialogVisible(false);
            },
          }}>
          You have an incoming request.Check your notifications section.
        </Snackbar>
      </Portal>
    </>
  );
}
