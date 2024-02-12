import {ImageBackground, KeyboardAvoidingView, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from './style/Login';
import axios from 'axios';
import {GlobalContext} from '../../context/GlobalStates';
import {getToken} from '../../utils';
import useHelperFunctions from '../Map/utils/helper';
import useAuth from '../../custom_hooks/useAuth';

export default function Login({navigation}) {
  const [{baseURL, deviceToken}, {setToken, setuserName, setDeviceToken}] =
    useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  const {setIsAuthenticated} = useAuth();

  const navigate = navigation.navigate;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    getLocation();
    const mobileToken = getToken();
    setDeviceToken(mobileToken);
  }, []);
  async function postData() {
    const data = {
      userName: username,
      password: password,
      deviceId: deviceToken?._j?.token,
    };
    try {
      const res = await axios.post(`http://${baseURL}/api/login`, data);
      setToken(res?.data?.token);
      setuserName(res?.data?.userName);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('err', error);
      console.log(error?.response?.data?.error?.message);
    }
  }
  const handleClick = () => {
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
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
