import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';
import {theme} from './constants/Theme';
import GlobalContextProvider from './context/GlobalStates';
import {getToken, notificationListener, requestUserPermission} from './utils';
import {PermissionsAndroid} from 'react-native';
import RootStack from './navigation/RootStack';

function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};
  const NotificationDb = firebase
    .app()
    .database(
      'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      return granted === 'granted';
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    // requestUserPermission();
    requestNotificationPermission();
    notificationListener({NotificationDb});
    getToken();
  }, []);
  return (
    <GlobalContextProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <RootStack />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GlobalContextProvider>
  );
}

export default App;
