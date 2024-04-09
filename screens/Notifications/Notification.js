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
import uuid from 'react-native-uuid';
import axios from 'axios';
const Notification = ({route, navigation}) => {
  const [
    {
      FirebaseDb: NotificationDb,
      requestId,
      userName,
      isThankYouVisible,
      distance,
      timer,
      location,
      baseURL,
    },
    {setMapView, setLocation, setIsThankYouVisible, setDistance},
  ] = useContext(GlobalContext);
  const {content, setContent, setVisibleDetail} = useNotificationUtils({
    navigation,
  });

  const {bloodGroup} = route?.params || {bloodGroup: undefined};

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

  async function postBloodData() {
    const data = {
      requestId: uuid.v4(),
      bloodGroup: bloodGroup,
      latitude: `${location?.coords?.latitude}`,
      longitude: `${location?.coords?.longitude}`,
      userName: userName,
      requestType: 'blood',
      type: 'request',
      status: 'Active',
      distance: distance,
      userName: userName,
    };
    console.log(data);

    try {
      console.log(baseURL);
      const res = await axios.post(
        `${baseURL}/send/notifications/request/blood`,
        data,
      );

      if (!res) throw new Error();
      const notificationId = uuid.v4();
      const sentTo = res?.data?.data?.sent_to;

      if (sentTo) {
        const sentToList = sentTo.split(',');
        sentToList.forEach(item => {
          NotificationDb.ref(`Notification/${item}/${notificationId}`)
            .set({
              requestId: `${res?.data?.data?.requestId}`,
              notification: res?.data?.data?.notification,
              data: res?.data?.data,
            })
            .then(() => console.log('Data updated.'))
            .catch(error => console.error('Error updating data:', error));
        });
      }
    } catch (error) {
      console.log('err', error);
      console.log(error?.response?.data);
    }
  }
  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setDistance(distance + 5);
        postBloodData();
      }, 300000);
    }
  }, [timer, distance]);

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
