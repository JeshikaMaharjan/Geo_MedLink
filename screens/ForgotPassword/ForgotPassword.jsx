import React from 'react';
import {ImageBackground, View} from 'react-native';
import {useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from '../Login/style/Login';
import axios from 'axios';
import {BASEURL} from '@env';

export default function ForgotPassword({navigation}) {
  const navigate = navigation.navigate;

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  async function handleClick() {
    const data = {
      userName: username,
      email,
    };
    console.log({data});
    try {
      const res = await axios.post(`${BASEURL}/forget/password`, data);
      console.log(res?.data);
      setEmail('');
      setUsername('');
    } catch (error) {
      console.log('err', error);
      console.log(error?.response?.data?.error?.message);
    }
  }
  return (
    <ImageBackground
      source={require('../../assets/Background.jpeg')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View>
          <Text variant="headlineLarge" style={{alignSelf: 'center'}}>
            Forgot Password
          </Text>
          <Text style={{alignSelf: 'center'}}>
            Please provide your correct information.
          </Text>
        </View>

        <View style={styles.formInput}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={username => setUsername(username)}
          />
          <View style={styles.formActions}>
            <Button mode="elevated" style={{width: 180}} onPress={handleClick}>
              Submit
            </Button>
          </View>
          <Text variant="titleMedium" style={{alignSelf: 'center'}}>
            Please check your email for further details.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
