import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

import {theme} from './constants/Theme';

import GlobalContextProvider from './context/GlobalStates';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import Registration from './screens/Registration/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Firebase from './screens/Firebase/test';

import {getToken, notificationListener, requestUserPermission} from './utils';

const Stack = createNativeStackNavigator();
function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};

  const isNotSignedIn = false;
  // Dashboard acces garna change isNotSignedIn to false

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getToken();
  });
  return (
    <GlobalContextProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator
              // initialRouteName="Login"
              initialRouteName="Firebase"
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
