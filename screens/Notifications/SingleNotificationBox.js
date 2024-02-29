import React, {useContext} from 'react';
import {View} from 'react-native';
import {Button, Surface, Text, Chip, IconButton} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NotificationStyle as styles} from './style';
import useNotificationUtils from './utils/useNotificationUtils';
import {GlobalContext} from '../../context/GlobalStates';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FontAwesome5} from '@expo/vector-icons';

const SingleNotificationBox = ({index, item, navigation}) => {
  const {
    visibleDetail,
    handleClick,
    toggleDetails,
    handleRequestAccept,
    handleConfirmClick,
    handleFetchLiveLocation,
    handleDisableLocationFetch,
  } = useNotificationUtils({
    navigation,
  });
  const [, {setIsThankYouVisible}] = useContext(GlobalContext);
  const disableTracking = item?.data?.disableTracking;

  return (
    <Surface key={index} elevation={5} style={styles.surface}>
      <View style={styles.notificationInnerContainer}>
        <View style={styles.notificationBodyBox}>
          <Text variant="titleLarge">{item?.notification?.title}</Text>
          <Text>{item?.notification?.body}</Text>
        </View>
        <IconButton
          mode="contained-tonal"
          icon={() => (
            <FontAwesome5
              name={visibleDetail[index] ? 'eye-slash' : 'eye'}
              size={18}
              color="black"
            />
          )}
          onPress={() => {
            toggleDetails(index);
          }}
          style={styles.button}
        />
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
      {visibleDetail[index] &&
        item?.data?.type === 'accepted' &&
        item?.data?.status === 'Closed' &&
        !disableTracking && (
          <View style={styles.actionBox}>
            <Text>Request Action</Text>
            <Button
              mode="elevated"
              onPress={() => {
                handleFetchLiveLocation(item);
              }}>
              Fetch Live Location
            </Button>
          </View>
        )}
      {visibleDetail[index] &&
        item?.data?.type === 'confirmed' &&
        item?.data?.status === 'Closed' &&
        !disableTracking && (
          <View style={styles.actionBox}>
            <Text style={{flexWrap: 'wrap'}}>
              Have you reached destination?
            </Text>
            <Button
              mode="elevated"
              onPress={() => {
                handleDisableLocationFetch(item);
                setIsThankYouVisible(true);
              }}>
              Yes
            </Button>
          </View>
        )}
    </Surface>
  );
};

export default SingleNotificationBox;
