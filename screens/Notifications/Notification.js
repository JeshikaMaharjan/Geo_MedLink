import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';
import {NotificationStyle as styles} from './style';
import {ActivityIndicator, Appbar, Text} from 'react-native-paper';
import SingleNotificationBox from './SingleNotificationBox';
import useNotificationUtils from './utils/useNotificationUtils';

const Notification = ({navigation}) => {
  const [{NotificationDb, requestId}, {setMapView, setLocation}] =
    useContext(GlobalContext);
  const {content, setContent, setVisibleDetail} = useNotificationUtils({
    navigation,
  });

  useEffect(() => {
    const onChildAdd = NotificationDb.ref('Notification').on(
      'child_added',
      snapshot => {
        setContent(prevContent => [...prevContent, snapshot.val()]);
        setVisibleDetail(prevVisibleDetail => [...prevVisibleDetail, false]);
      },
    );
    return () =>
      NotificationDb.ref('/Notification').off('child_added', onChildAdd);
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Notification" />
      </Appbar.Header>
      <ScrollView>
        {!content?.length ? (
          <View style={styles.loader}>
            <ActivityIndicator />
            <Text>Loading...</Text>
            <Text>Incoming messages will be shown here.</Text>
          </View>
        ) : (
          <View style={{display: 'flex', gap: 10, marginTop: '100px'}}>
            {content.map((item, index) => (
              <SingleNotificationBox
                key={index}
                item={item}
                index={index}
                navigation={navigation}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;
