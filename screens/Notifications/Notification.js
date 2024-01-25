import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalStates';

const Notification = () => {
  const [{NotificationDb}] = useContext(GlobalContext);
  console.log('o', NotificationDb);
  return <Text>Notification</Text>;
};

export default Notification;
