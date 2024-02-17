import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {RootStackNavigationProps} from '../../navigations/Root/root-stack.types';
import {useUserContext} from '../../context/userContext';
import {useLogin} from '../../hooks/user/useUserApi';
import axios from 'axios';

export const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    setUsername: setContextUsername,
    setToken: setContextToken,
    setImage: setImage,
  } = useUserContext();
  const {mutateAsync: login, error} = useLogin();

  const onLoginClick = async () => {
    // const data = {userName: username, password: password};
    // try {
    //   const res = await axios.post(
    //     `http://192.168.101.19:5000/api/login`,
    //     data,
    //   );
    //   console.log(res);
    //   setContextUsername(res?.data?.data.username);
    //   setContextToken(res?.data?.data.token);
    //   setImage(res?.data?.data.image);
    // } catch (error) {
    //   console.log('err', error);
    //   console.log(error?.response?.data?.error?.message);
    // }
    const response = await login({username, password});
    setContextUsername(response.data.username);
    setContextToken(response.data.token);
    setImage(response.data.image);
  };

  return (
    <View style={{padding: 16, gap: 16}}>
      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <Button mode="contained" onPress={onLoginClick}>
        Login
      </Button>
      {/* <Text variant="bodyMedium">{error?.message}</Text> */}
      {/* {console.log({error})} */}
    </View>
  );
};
