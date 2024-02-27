import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type BottomTabParamsList = {
  ProfileStack: undefined;
  Feed: undefined;
  Upload: undefined;
  Dashboard: undefined;
  News: undefined;
  EventList: undefined;
};

export type ProfileStackProps = NativeStackScreenProps<
  BottomTabParamsList,
  'ProfileStack'
>;

export type TabNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;
