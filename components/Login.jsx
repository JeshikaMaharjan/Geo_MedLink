import {Button, Text} from 'react-native';

export default function Login({navigation}) {
  const navigate = navigation.navigate;
  return (
    <>
      <Text>Login</Text>
      <Button
        title="Forgot password"
        onPress={() => {
          navigate('ForgotPassword');
        }}
      />
      <Button
        title="Dashboard"
        onPress={() => {
          navigate('Dashboard');
        }}
      />
    </>
  );
}
