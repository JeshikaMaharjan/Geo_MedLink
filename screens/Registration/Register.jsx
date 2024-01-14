import {
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Card,
  Appbar,
  Text,
  SegmentedButtons,
  Divider,
} from 'react-native-paper';
import {Registerstyles as styles} from './style/Register';
import React, {useContext, useEffect, useState} from 'react';
import UserRegistration from './UserRegistration/UserRegistration';
import OrgRegistration from './OrganizationRegistration/OrgRegistration';
import useHelperFunctions from '../Map/utils/helper';
import {GlobalContext} from '../../context/GlobalStates';
import {getToken} from '../../utils';

function Registration({navigation}) {
  const [active, setActive] = useState('user');
  const [, {setDeviceToken}] = useContext(GlobalContext);
  const {getLocation} = useHelperFunctions();
  useEffect(() => {
    getLocation();
    const mobileToken = getToken();
    setDeviceToken(mobileToken);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Background.jpeg')}
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
                {active === 'user' && (
                  <UserRegistration navigation={navigation} />
                )}
                {active === 'organization' && (
                  <OrgRegistration navigation={navigation} />
                )}
              </View>
            </ScrollView>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
export default Registration;
