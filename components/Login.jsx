import {ImageBackground, View} from 'react-native';
import {useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from '../styles/Login';
import axios from 'axios';

export default function Login({navigation}) {
  const navigate = navigation.navigate;
  const baseURL = '192.168.1.71:3000';
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
      source={require('../assets/Background.jpeg')}
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
            label="Username"
            value={username}
            onChangeText={username => setUsername(username)}
          />
          <TextInput
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
        {/* <Button
          title="Dashboard"
          onPress={() => {
            navigate('Dashboard');
          }}
        /> */}
      </View>
    </ImageBackground>
  );
}
