import messaging from '@react-native-firebase/messaging';
import * as ImagePicker from 'expo-image-picker';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const notificationListener = ({NotificationDb}) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.data,
    );

    const newEntry = NotificationDb.push();
    console.log('Auto generated key: ', newEntry.key);

    newEntry
      .set({
        data: remoteMessage?.data,
      })
      .then(() => console.log('Data updated.'));
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.data,
        );
      }
      const newEntry = NotificationDb.push();
      console.log('Auto generated key: ', newEntry.key);

      newEntry
        .set({
          data: remoteMessage?.data,
        })
        .then(() => console.log('Data updated.'));
      //   setLoading(false);
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log(token);
  return {token};
};
