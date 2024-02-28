import Map from '../Map/Map';
import messaging from '@react-native-firebase/messaging';
import React, {useContext, useEffect, useState} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import {GlobalContext} from '../../context/GlobalStates';

export default function Dashboard({navigation}) {
  const [
    {
      FirebaseDb: RealTimeLocationDb,
      FirebaseDb: LocationFetchUsersDb,
      location,
      fetchEnabled,
      userName,
    },
    {setFetchEnabled},
  ] = useContext(GlobalContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storeLocation = () => {
      RealTimeLocationDb.ref(`RealTime/Users/${userName}`)
        .update({
          latitude: `${location?.coords?.latitude}`,
          longitude: `${location?.coords?.longitude}`,
        })
        .then(() => console.log('Data updated.'));
    };

    let intervalId;
    if (fetchEnabled) {
      intervalId = setInterval(storeLocation, 5000);
    } else {
      RealTimeLocationDb.ref(`RealTime/Users/${userName}`).set(null);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchEnabled, location, RealTimeLocationDb, userName]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setIsDialogVisible(true);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const onChildAdded = LocationFetchUsersDb.ref('LocationFetchUsers').on(
      'child_added',
      snapshot => {
        const newData = snapshot.val();
        setData(newData);
      },
    );

    const onChildChanged = LocationFetchUsersDb.ref('LocationFetchUsers').on(
      'child_changed',
      snapshot => {
        const newData = snapshot.val();
        setData(newData);
      },
    );

    const onChildRemoved = LocationFetchUsersDb.ref('LocationFetchUsers').on(
      'child_removed',
      snapshot => {
        const newData = snapshot.val();
        setData(newData);
      },
    );

    return () => {
      LocationFetchUsersDb.ref('LocationFetchUsers').off(
        'child_added',
        onChildAdded,
      );
      LocationFetchUsersDb.ref('LocationFetchUsers').off(
        'child_changed',
        onChildChanged,
      );
      LocationFetchUsersDb.ref('LocationFetchUsers').off(
        'child_removed',
        onChildRemoved,
      );
    };
  }, []);
  useEffect(() => {
    if (data) {
      if (Object.keys(data).includes(userName)) {
        setFetchEnabled(true);
      } else {
        setFetchEnabled(false);
      }
    }
  }, [data]);

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
