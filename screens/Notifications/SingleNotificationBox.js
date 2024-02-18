import React from 'react';
import {View} from 'react-native';
import {Button, Surface, Text, Chip} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NotificationStyle as styles} from './style';
import useNotificationUtils from './utils/useNotificationUtils';

const SingleNotificationBox = ({index, item, navigation}) => {
  const {
    visibleDetail,
    handleClick,
    toggleDetails,
    handleRequestAccept,
    handleConfirmClick,
  } = useNotificationUtils({
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
          <View style={styles.userDetailBox}>
            <Text style={styles.userDetail}>User Details</Text>
            <Chip
              mode="outlined"
              style={
                item?.data?.status == 'Active'
                  ? styles.activeStatusBox
                  : styles.closedStatusBox
              }>
              {item?.data?.status}
            </Chip>
          </View>
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
            <Button
              onPress={() => {
                handleClick(item);
              }}>
              View Location on Map
            </Button>
            <FontAwesomeIcon name="map-o" color="black" size={15} />
          </View>
        </View>
      )}
      {visibleDetail[index] &&
        item?.data?.type === 'request' &&
        item?.data?.status === 'Active' && (
          <View style={styles.actionBox}>
            <Text>Request Actions</Text>
            <Button
              mode="elevated"
              onPress={() => {
                handleRequestAccept(item);
              }}>
              Accept
            </Button>
            <Button
              mode="elevated"
              onPress={() => {
                toggleDetails(index);
              }}>
              Reject
            </Button>
          </View>
        )}
      {visibleDetail[index] &&
        item?.data?.type === 'accepted' &&
        item?.data?.status === 'Active' && (
          <View style={styles.actionBox}>
            <Text>Request Action</Text>
            <Button
              mode="elevated"
              onPress={() => {
                handleConfirmClick(item);
              }}>
              Confirm User
            </Button>
          </View>
        )}
    </Surface>
  );
};

export default SingleNotificationBox;
