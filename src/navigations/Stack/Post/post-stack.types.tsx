import { StackNavigationProp } from "@react-navigation/stack";

export type PostStackParamsList = {
  Post: undefined;
  // Comment: undefined;
};

export type PostStackNavigationProps = StackNavigationProp<PostStackParamsList>;
