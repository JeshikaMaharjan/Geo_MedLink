/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {firebase} from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const NotificationDb = firebase
    .app()
    .database(
      'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );
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

AppRegistry.registerComponent(appName, () => App);
