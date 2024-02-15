import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import Login from '../screens/Login/Login';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Registration from '../screens/Registration/Register';
import Dashboard from '../screens/Dashboard/Dashboard';
import Notification from '../screens/Notifications/Notification';
import {GlobalContext} from '../context/GlobalStates';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  const [{token}] = useContext(GlobalContext);
  console.log({token});

  return (
    <Stack.Navigator
      // initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      {!token ? (
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login Screen',
            }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Registration" component={Registration} />
          {/* <Stack.Screen name="Firebase" component={Firebase} /> */}
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
