import {
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Card,
  Appbar,
  Text,
  SegmentedButtons,
  Divider,
} from 'react-native-paper';
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
      <KeyboardAvoidingView behavior="height">
        <View style={styles.container}>
          <Card mode="elevated" style={styles.card}>
            <View style={styles.title}>
              <SegmentedButtons
                value={active}
                onValueChange={setActive}
                buttons={[
                  {
                    value: 'user',
                    label: 'USER',
                  },
                  {
                    value: 'organization',
                    label: 'ORGANIZATION',
                  },
                ]}
              />
              <Text
                variant="titleMedium"
                style={{alignSelf: 'center', paddingBottom: 5}}>
                Please enter your correct info.
              </Text>
              <Divider />
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View>
                {active == 'user' && <UserRegistration />}
                {active == 'organization' && <OrgRegistration />}
              </View>
            </ScrollView>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
export default Registration;
