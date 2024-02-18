import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../context/GlobalStates';
import {Portal, Snackbar} from 'react-native-paper';

export default function Dashboard({navigation}) {
  const [{}, {setIsIncoming}] = useContext(GlobalContext);
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
      <Map navigation={navigation} />
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
