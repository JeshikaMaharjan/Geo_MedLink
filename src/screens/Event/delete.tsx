import React from 'react';

type DeleteParams = {
  isVisible: any;
  toggleIsVisible: () => void;
  eventId: number;
};

import {View} from 'react-native';
import {Button, Dialog, Text} from 'react-native-paper';
import {useDeletePost} from '../../hooks/post/useDeleteApi';
import {useDeleteEvent} from '../../hooks/event/useEventDelete';

export const Delete = ({
  isVisible,
  toggleIsVisible: toggleIsVisible,
  eventId,
}: DeleteParams) => {
  console.log({eventId});
  const {mutate: deleteEvent, error} = useDeleteEvent();
  const onPressYes = () => {
    toggleIsVisible();
    deleteEvent(eventId);
  };
  const onPressNo = () => {
    toggleIsVisible();
  };
  return (
    <View>
      <Dialog.Title
        style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        Delete Event
      </Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium" style={{textAlign: 'center'}}>
          Are you sure you want to delete this event?
        </Text>
      </Dialog.Content>
      <Dialog.Actions style={{justifyContent: 'space-between'}}>
        <Button
          onPress={onPressNo}
          style={{backgroundColor: '#f4f4f7', width: '45%'}}>
          <Text style={{color: 'black', fontWeight: '700'}}>No</Text>{' '}
        </Button>
        <Button
          onPress={onPressYes}
          style={{backgroundColor: '#ff3f56', width: '45%'}}>
          <Text style={{color: 'white', fontWeight: '700'}}>Yes</Text>
        </Button>
      </Dialog.Actions>
    </View>
  );
};
