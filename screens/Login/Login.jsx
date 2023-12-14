import {ImageBackground, KeyboardAvoidingView, View} from 'react-native';
import {useContext, useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from './style/Login';
import axios from 'axios';
import {GlobalContext} from '../../context/GlobalStates';

export default function Login({navigation}) {
  const [{baseURL, userName, token}, {setToken, setuserName}] =
    useContext(GlobalContext);

  const navigate = navigation.navigate;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  async function postData() {
    const data = {
      userName: username,
      password: password,
    };
    try {
      const res = await axios.post(`http://${baseURL}/api/login`, data);
      console.log(res);
    } catch (error) {
      console.log(error?.response?.data);
    }
  }
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
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <View style={styles.formActions}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Button
                mode="elevated"
                style={{width: 180}}
                onPress={() => {
                  postData();
                }}>
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
