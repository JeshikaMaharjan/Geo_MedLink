import React from 'react';

type DeleteParams = {
  isVisible: any;
  toggleIsVisible: () => void;
  postId: number;
};

import {View} from 'react-native';
import {Button, Dialog, Text} from 'react-native-paper';
import {useDeletePost} from '../../hooks/post/useDeleteApi';

export const Delete = ({
  isVisible,
  toggleIsVisible: toggleIsVisible,
  postId,
}: DeleteParams) => {
  console.log({postId});
  const {mutate: deletePost, error} = useDeletePost();
  const onPressYes = () => {
    toggleIsVisible();
    deletePost(postId);
  };
  const onPressNo = () => {
    toggleIsVisible();
  };
  return (
    <View>
      <Dialog.Title
        style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        Delete post
      </Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium" style={{textAlign: 'center'}}>
          Are you sure you want to delete this post?
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
