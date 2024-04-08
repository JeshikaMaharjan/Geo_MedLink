/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {firebase} from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {YellowBox} from 'react-native';

LogBox.ignoreAllLogs(true);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
