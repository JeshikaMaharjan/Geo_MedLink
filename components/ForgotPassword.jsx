import {ImageBackground, View} from 'react-native';
import {useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from '../styles/Login';

export default function ForgotPassword({navigation}) {
  const navigate = navigation.navigate;

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  return (
    <ImageBackground
      source={require('../assets/Background.jpeg')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={{alignSelf: 'center'}}>
          {' '}
          Forgot Password
        </Text>

        <View style={styles.formInput}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            label="Username"
            value={username}
            onChangeText={username => setUsername(username)}
          />
          <View style={styles.formActions}>
            <Button
              mode="elevated"
              style={{width: 180}}
              onPress={() => {
                pass;
              }}>
              Submit
            </Button>
          </View>
          <Text variant="titleSmall" style={{alignSelf: 'center'}}>
            Please check your email for further details.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
