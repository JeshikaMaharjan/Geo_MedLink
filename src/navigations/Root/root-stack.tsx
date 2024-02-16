import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from '../Bottom/bottom-stack';
import {RootStackParamList} from './root-stack.types';
import {useUserContext} from '../../context/userContext';
import {LoginScreen} from '../../screens/Login/login';
import {ChangePassword} from '../../screens/User/changePassword';
import {EditProfile} from '../../screens/User/editProfiles';
import {EditDonor} from '../../screens/User/editDonor';
import {EditDoctor} from '../../screens/User/editDoctor';
import {Profile} from '../../screens/User/profile';
import {Search} from '../../screens/Search/search';

const RootStack = createStackNavigator<RootStackParamList>();

const {Navigator, Screen} = RootStack;

export const RootStackNavigator = () => {
  const {token} = useUserContext();
  return (
    <Navigator>
      {!token ? (
        <Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          {/* <Screen name="Comment" component={Comment} /> */}
          <Screen name="ChangePassword" component={ChangePassword} />
          <Screen name="EditProfile" component={EditProfile} />
          <Screen name="EditDonor" component={EditDonor} />
          <Screen name="EditDoctor" component={EditDoctor} />
          <Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
        </>
      )}
    </Navigator>
  );
};
