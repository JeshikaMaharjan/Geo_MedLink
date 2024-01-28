import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';

const Notification = () => {
  const [{NotificationDb}] = useContext(GlobalContext);
  const [content, setContent] = useState([]);
  NotificationDb.ref('Notification').on('value', snapshot => {
    setContent(snapshot.val());
    console.log('**********************');
    console.log(snapshot.val());
  });
  return (
    <View>
      <Text>Notification</Text>
      {console.log('cc', content)}
      {/* {content?.map(item => {
        <Text>{item}</Text>;
      })} */}
    </View>
  );
};

export default Notification;
