import {View, ImageBackground} from 'react-native';
import {Button, Card, Appbar, Text} from 'react-native-paper';
import {Registerstyles as styles} from '../styles/Register';
import {useState} from 'react';
import UserRegistration from './UserRegistration';
import OrgRegistration from './OrgRegistration';

function Registration({navigation}) {
  const navigate = navigation.navigate;
  const [active, setActive] = useState('user');

  return (
    <ImageBackground
      source={require('../assets/Background.jpeg')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Registration" />
      </Appbar.Header>
      <View style={styles.container}>
        <Card mode="elevated" style={styles.card}>
          <View style={styles.title}>
            <Text
              variant="titleMedium"
              style={
                active == 'user'
                  ? styles.titleHighlight
                  : styles.titleNoHighlight
              }
              onPress={() => {
                setActive('user');
              }}>
              USER
            </Text>
            <Text
              variant="titleMedium"
              style={
                active == 'org'
                  ? styles.titleHighlight
                  : styles.titleNoHighlight
              }
              onPress={() => {
                setActive('organization');
              }}>
              ORGANIZATION
            </Text>
          </View>
          <View>
            {active == 'user' && <UserRegistration />}
            {active == 'organization' && <OrgRegistration />}
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
}
export default Registration;
