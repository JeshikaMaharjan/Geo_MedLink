import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
  Login: undefined;
  BottomTab: undefined;
  // Comment: { postId: number };
  ChangePassword: undefined;
  EditProfile: undefined;
  Profile: { username: string };
  Search: undefined;
  EditDonor: undefined;
  EditDoctor: undefined;
};
// export type CommentProps = NativeStackScreenProps<
//   RootStackParamList,
//   "Comment"
// >;

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
