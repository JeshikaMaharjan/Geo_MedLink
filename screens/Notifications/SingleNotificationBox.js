import React from 'react';
import {View} from 'react-native';
import {Button, Surface, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NotificationStyle as styles} from './style';
import useNotificationUtils from './utils/useNotificationUtils';

const SingleNotificationBox = ({index, item, navigation}) => {
  const {visibleDetail, handleClick, toggleDetails} = useNotificationUtils({
    navigation,
  });

  return (
    <Surface key={index} elevation={5} style={styles.surface}>
      <View style={styles.notificationInnerContainer}>
        <View>
          <Text variant="titleLarge">{item?.notification?.title}</Text>
          <Text>{item?.notification?.body}</Text>
        </View>
        <Button
          mode="elevated"
          style={styles.button}
          onPress={() => {
            toggleDetails(index);
          }}>
          {visibleDetail[index] ? 'Hide Details' : 'View Details'}
        </Button>
      </View>
      {visibleDetail[index] && (
        <View style={styles.detailBox}>
          <Text style={styles.userDetail}>User Details</Text>
          <Text variant="bodyLarge">User: {item?.data?.userName}</Text>
          <Text variant="bodyLarge">
            Phone Number: {item?.data?.phoneNumber}
          </Text>
          {item?.data?.bloodGroup && (
            <Text variant="bodyLarge">
              Blood Group:{item?.data?.bloodGroup}
            </Text>
          )}
          {item?.data?.orgName && (
            <Text variant="bodyLarge">
              Organization Name: {item?.data?.orgName}
            </Text>
          )}
          <Text variant="bodyLarge">
            Location: [{item?.data?.latitude}, {item?.data?.longitude}]
          </Text>
          <View style={styles.locationBox}>
            <Button>View Location on Map</Button>
            <FontAwesomeIcon name="map-o" color="black" size={15} />
          </View>
        </View>
      )}
      {visibleDetail[index] && item?.data?.type === 'request' && (
        <View style={styles.actionBox}>
          <Text>Request Actions</Text>
          <Button mode="elevated">Accept</Button>
          <Button mode="elevated">Reject</Button>
        </View>
      )}
      {visibleDetail[index] && item?.data?.type === 'accepted' && (
        <View style={styles.actionBox}>
          <Text>Request Action</Text>
          <Button mode="elevated">Confirm User</Button>
        </View>
      )}
    </Surface>
  );
};

export default SingleNotificationBox;
