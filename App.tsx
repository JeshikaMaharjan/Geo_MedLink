import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Text} from 'react-native';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function App() {
  const isNotSignedIn = true;
  // Dashboard acces garna change isNotSignedIn to false
  return (
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
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
