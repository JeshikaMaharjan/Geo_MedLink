import React from 'react';
import {View} from 'react-native';
import {Badge, IconButton} from 'react-native-paper';

const Icon = ({navigation}) => {
  return (
    <View>
      <Badge
        visible={true}
        size={10}
        style={{position: 'absolute', top: 10, right: 12}}
      />
      <IconButton
        icon="bell"
        onPress={() => {
          navigation.navigate('Notification');
        }}
        color="#fff"
      />
    </View>
  );
};

export default Icon;
