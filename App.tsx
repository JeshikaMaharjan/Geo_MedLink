import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';

import {theme} from './constants/Theme';

import GlobalContextProvider from './context/GlobalStates';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import Registration from './screens/Registration/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Firebase from './screens/Firebase/test';

import {getToken, notificationListener, requestUserPermission} from './utils';
import Notification from './screens/Notifications/Notification';
import {PermissionsAndroid} from 'react-native';

const Stack = createNativeStackNavigator();
function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};
  const NotificationDb = firebase
    .app()
    .database(
      'https://geomedlink-a59fa-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  const isNotSignedIn = false;
  // Dashboard acces garna change isNotSignedIn to false
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
  });
  return (
    <GlobalContextProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator
              initialRouteName="Login"
              // initialRouteName="Firebase"
              screenOptions={{
                headerShown: false,
              }}>
              {isNotSignedIn ? (
                <Stack.Group>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      title: 'Login Screen',
                    }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                  />
                  <Stack.Screen name="Registration" component={Registration} />
                  <Stack.Screen name="Firebase" component={Firebase} />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen name="Dashboard" component={Dashboard} />
                  <Stack.Screen name="Notification" component={Notification} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GlobalContextProvider>
  );
}

export default App;
