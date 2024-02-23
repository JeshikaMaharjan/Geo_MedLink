import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';
import {NotificationStyle as styles} from './style';
import {
  ActivityIndicator,
  Appbar,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import SingleNotificationBox from './SingleNotificationBox';
import useNotificationUtils from './utils/useNotificationUtils';

const Notification = ({navigation}) => {
  const [
    {FirebaseDb: NotificationDb, requestId, userName, isThankYouVisible},
    {setMapView, setLocation, setIsThankYouVisible},
  ] = useContext(GlobalContext);
  const {content, setContent, setVisibleDetail} = useNotificationUtils({
    navigation,
  });

  useEffect(() => {
    const onChildAdded = NotificationDb.ref(`Notification/${userName}`).on(
      'child_added',
      snapshot => {
        const newData = snapshot.val();
        setContent(prevContent => [...prevContent, newData]);
        setVisibleDetail(prevVisibleDetail => [...prevVisibleDetail, false]);
      },
    );

    const onChildChanged = NotificationDb.ref(`Notification/${userName}`).on(
      'child_changed',
      snapshot => {
        const newData = snapshot.val();
        setContent(prevContent => {
          return prevContent.map(item => {
            if (item.requestId === newData.requestId) {
              return {
                ...item,
                data: {
                  ...item.data,
                  status: newData.data.status,
                  disableTracking: newData.data.disableTracking,
                },
              };
            }
            return item;
          });
        });
      },
    );

    return () => {
      NotificationDb.ref(`Notification/${userName}`).off(
        'child_added',
        onChildAdded,
      );
      NotificationDb.ref(`Notification/${userName}`).off(
        'child_changed',
        onChildChanged,
      );
    };
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
      <Portal>
        <Snackbar
          wrapperStyle={{top: 70}}
          visible={isThankYouVisible}
          onDismiss={() => setIsThankYouVisible(false)}
          action={{
            label: 'Okay',
            onPress: () => {
              setIsThankYouVisible(false);
            },
          }}>
          Thank You For Your Service.
        </Snackbar>
      </Portal>
    </View>
  );
};

export default Notification;
