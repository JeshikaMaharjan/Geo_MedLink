import React from 'react';
import {ImageBackground, KeyboardAvoidingView, Modal, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {Text, TextInput, Button, Portal, Card} from 'react-native-paper';
import {Loginstyles as styles} from './style/Login';
import axios from 'axios';
import {GlobalContext} from '../../context/GlobalStates';
import {getToken} from '../../utils';
import useHelperFunctions from '../Map/utils/helper';
import {useUserContext} from '../../src/context/userContext';
import {BASEURL} from '@env';

export default function Login({navigation}) {
  const [{deviceToken}, {setuserName, setDeviceToken}] =
    useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = navigation.navigate;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {
    setUsername: setContextUsername,
    setToken: setContextToken,
    setImage,
  } = useUserContext();
  useEffect(() => {
    getLocation();
    const mobileToken = getToken();
    setDeviceToken(mobileToken);
  }, []);

  async function postData() {
    const data = {
      userName: username,
      password: password,
      // deviceId: deviceToken?._j?.token,
    };
    console.log({data});
    try {
      const res = await axios.post(`${BASEURL}/login`, data);
      console.log(res?.data);
      setuserName(res?.data?.data?.username);
      setContextUsername(res?.data?.data?.username);
      setContextToken(res?.data?.data?.token);
      setImage(res?.data?.data?.image);
    } catch (error) {
      console.log({error});
      console.log(error?.response?.data?.error?.message);
      setIsError(true);
      setErrorMessage(error?.response?.data?.error?.message);
    }
  }
  const handleClick = () => {
    setIsError(false);
    postData();
  };
  return (
    <ImageBackground
      source={require('../../assets/Background.jpeg')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View>
          <Text variant="headlineLarge">GeoMedLink</Text>
          <Text variant="titleSmall">
            Please provide your login credentials.
          </Text>
        </View>
        <View style={styles.formInput}>
          <TextInput
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={username => setUsername(username)}
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <View style={styles.formActions}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Button
                mode="elevated"
                style={{width: 180}}
                onPress={handleClick}>
                Log In
              </Button>
              <Button
                style={{width: 180}}
                mode="elevated"
                onPress={() => {
                  navigate('Registration');
                }}>
                Register
              </Button>
            </View>
            <Button
              style={{width: 180}}
              onPress={() => {
                navigate('ForgotPassword');
              }}>
              Forgot password?
            </Button>
            {isError && (
              <View
                style={{
                  marginTop: 10,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: 'red',
                }}>
                <Text>{errorMessage}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
