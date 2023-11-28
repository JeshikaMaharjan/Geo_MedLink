import {ImageBackground, View} from 'react-native';
import {useState} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import {Loginstyles as styles} from '../styles/Login';

export default function Login({navigation}) {
  const navigate = navigation.navigate;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
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
                  pass;
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
