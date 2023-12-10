import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

import {theme} from './constants/Theme';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Dashboard from './screens/Dashboard';
import Registration from './screens/Register';
import GlobalContextProvider from './context/GlobalStates';

const Stack = createNativeStackNavigator();
function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};

  const isNotSignedIn = true;
  // Dashboard acces garna change isNotSignedIn to false
  return (
    <GlobalContextProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator
              initialRouteName="Login"
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
