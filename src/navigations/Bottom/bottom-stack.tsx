import React from 'react';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamsList} from './bottom-stack.types';
import {useUserContext} from '../../context/userContext';
import {NewsFeed} from '../../screens/Post/Components/newsFeed';
import {News} from '../../screens/News/news';
import {UploadPost} from '../../screens/Post/uploadPost';
import {Profile} from '../../screens/User/profile';
import Dashboard from '../../../screens/Dashboard/Dashboard';
import Icon from '../../../screens/Notifications/Icon';
import {EventList} from '../../screens/Event/eventList';

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const {Screen, Navigator} = Tab;

export const BottomTabNavigator = () => {
  const {username} = useUserContext();
  return (
    <Navigator>
      <Screen
        name="Feed"
        component={NewsFeed}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="post" size={24} color="black" />
          ),
          title: 'Post',
          headerShown: false,
        }}
      />
      <Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="newspaper-o" size={24} color="black" />
          ),
          title: 'News',
        }}
      />
      <Screen
        name="EventList"
        component={EventList}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-note" size={24} color="black" />
          ),
          title: 'Events',
        }}
      />

      <Screen
        name="Upload"
        component={UploadPost}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="plussquareo" size={24} color="black" />
          ),
          title: 'Upload Post',
          headerShown: false,
        }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => <Icon />,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color="black"
            />
          ),
          title: 'Map',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="Notification" component={Notification} /> */}
      <Screen
        name="ProfileStack"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-outline" size={24} color="black" />
          ),
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Navigator>
  );
};
