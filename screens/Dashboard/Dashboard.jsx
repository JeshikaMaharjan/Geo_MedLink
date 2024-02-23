import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import React, {useContext, useEffect, useState} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';

export default function Dashboard({navigation}) {
  const [
    {FirebaseDb: RealTimeLocationDb, location, fetchEnabled, userName},
    {setFetchEnabled},
  ] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const storeLocation = () => {
      RealTimeLocationDb.ref(`RealTime/${userName}`)
        .update({
          latitude: `${location?.coords?.latitude}`,
          longitude: `${location?.coords?.longitude}`,
        })
        .then(() => console.log('Data updated.'));
    };

    let intervalId;
    if (fetchEnabled) {
      intervalId = setInterval(storeLocation, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchEnabled, location, RealTimeLocationDb, userName]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsDialogVisible(true);
      if (remoteMessage?.data?.status == 'Closed') {
        setFetchEnabled(true);
        RealTimeLocationDb.ref(`RealTime/${remoteMessage.data?.sent_to}`).set({
          latitude: `${location?.coords?.latitude}`,
          longitude: `${location?.coords?.longitude}`,
        });
      }
    });

    return unsubscribe;
  }, []);

  console.log({fetchEnabled});

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
          You have an incoming request. Check your notifications section.
        </Snackbar>
      </Portal>
    </>
  );
}
