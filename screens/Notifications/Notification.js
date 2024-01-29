import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';
import {NotificationStyle as styles} from './style';
import {ActivityIndicator, Appbar, Surface, Text} from 'react-native-paper';

const Notification = () => {
  const [{NotificationDb, requestId}] = useContext(GlobalContext);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const onChildAdd = NotificationDb.ref(`/Notification/${requestId}`).on(
      'child_added',
      snapshot => {
        console.log('A new node has been added', snapshot.val());
        setContent(prevContent => [...prevContent, snapshot.val()]);
      },
    );
    return () =>
      NotificationDb.ref(`/Notification/${requestId}`).off(
        'child_added',
        onChildAdd,
      );
  }, [requestId]);
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
          <View style={{display: 'flex', gap: 20, marginTop: '100px'}}>
            {content.map((item, index) => (
              <Surface key={index} elevation={4} style={styles.surface}>
                <Text>{item.data.userName}</Text>
              </Surface>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;
