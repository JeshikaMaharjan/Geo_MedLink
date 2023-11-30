import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ImageBackground, View, useColorScheme} from 'react-native';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';

import {theme} from './styles/Theme';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Registration from './components/Register';

const Stack = createNativeStackNavigator();
function App() {
  const paperTheme = {...MD3LightTheme, colors: theme.light};

  const isNotSignedIn = false;
  // Dashboard acces garna change isNotSignedIn to false
  return (
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
  );
}

export default App;
