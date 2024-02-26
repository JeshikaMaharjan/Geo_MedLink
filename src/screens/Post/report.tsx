import React from 'react';
// import { Button, Modal, StyleSheet, Text, View } from "react-native";

type ReportParams = {
  isVisible: any;
  toggleIsVisible: () => void;
  postId: number;
};

import {View} from 'react-native';
import {Button, Dialog, Text} from 'react-native-paper';
import {useReportPost} from '../../hooks/post/useReportApi';

export const Report = ({
  isVisible,
  toggleIsVisible: toggleIsVisible,
  postId,
}: ReportParams) => {
  console.log({postId});
  const {mutate: reportPost, error} = useReportPost();
  const onPressYes = () => {
    toggleIsVisible();
    reportPost(postId);
  };
  const onPressNo = () => {
    toggleIsVisible();
  };
  return (
    <View>
      {/* <Dialog visible={isVisible} onDismiss={toggleIsVisible}> */}
      <Dialog.Title
        style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        Report Post
      </Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium" style={{textAlign: 'center'}}>
          Are you sure you want to report this post?
        </Text>
      </Dialog.Content>
      <Dialog.Actions
        style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button onPress={onPressNo} mode="outlined" style={{width: '45%'}}>
          <Text style={{color: 'black', fontWeight: '700'}}>Cancel</Text>
        </Button>
        <Button
          onPress={onPressYes}
          style={{backgroundColor: '#ff3f56', width: '45%'}}>
          <Text style={{color: 'white', fontWeight: '700'}}>Report</Text>
        </Button>
      </Dialog.Actions>
      {/* </Dialog> */}
    </View>
  );
};
