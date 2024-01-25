import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalStates';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  const [, {setIsIncoming}] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('incoming', remoteMessage);
      setIsIncoming(true);
      setIsDialogVisible(true);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>New notification</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              You have an incoming request.Check your notifications section.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
