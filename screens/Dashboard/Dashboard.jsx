import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalStates';
import {Portal, Snackbar} from 'react-native-paper';
import uuid from 'react-native-uuid';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  const [{NotificationDb}, {setIsIncoming}] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('incoming', remoteMessage);
      setIsIncoming(true);
      setIsDialogVisible(true);
      const notificationId = uuid.v4();

      NotificationDb.ref(
        `Notification/${remoteMessage?.data?.sent_to}/${notificationId}`,
      )
        .set({
          requestId: `${remoteMessage?.data?.requestId}`,
          notification: remoteMessage?.notification,
          data: remoteMessage?.data,
        })
        .then(() => console.log('Data updated.'));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
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
