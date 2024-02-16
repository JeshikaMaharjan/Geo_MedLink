import { StackNavigationProp } from "@react-navigation/stack";

export type NewsFeedStackParamsList = {
  NewsFeed: undefined;
  Post: undefined;
};

export type NewsFeedStackNavigationProps =
  StackNavigationProp<NewsFeedStackParamsList>;
