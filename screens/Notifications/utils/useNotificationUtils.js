import {useContext, useState} from 'react';
import {GlobalContext} from '../../../context/GlobalStates';
import axios from 'axios';
import uuid from 'react-native-uuid';

const useNotificationUtils = ({navigation}) => {
  const [
    {
      FirebaseDb: NotificationDb,
      FirebaseDb: LocationFetchUsersDb,
      location,
      userName,
      baseURL,
    },
    {setMapView, setConfirmedUserLocation},
  ] = useContext(GlobalContext);
  const [content, setContent] = useState([]);
  const navigate = navigation.navigate;
  const [visibleDetail, setVisibleDetail] = useState([]);
  const handleClick = item => {
    setMapView('confirmedUser');
    setConfirmedUserLocation({
      coords: {
        latitude: item?.data?.latitude,
        longitude: item?.data?.longitude,
      },
    });
    navigate('Dashboard');
  };

  const toggleDetails = index => {
    setVisibleDetail(prevVisibleDetail => {
      const newVisibleDetail = [...prevVisibleDetail];
      newVisibleDetail[index] = !newVisibleDetail[index];
      return newVisibleDetail;
    });
  };
  async function postAcceptData(item) {
    const data = {
      requestId: item?.requestId,
      latitude: `${location?.coords?.latitude}`,
      longitude: `${location?.coords?.longitude}`,
      responder: userName,
      requestType: item?.data?.requestType === 'blood' ? 'blood' : 'ambulance',
      type: 'accepted',
      status: 'Active',
      disableTracking: false,
      requestInitiator: item?.data?.userName,
      ...(item?.data?.requestType === 'blood' && {
        bloodGroup: item?.data?.bloodGroup,
      }),
    };

    try {
      const apiUrl =
        item?.data?.requestType === 'blood'
          ? `http://${baseURL}/api/send/notifications/blood/respond`
          : `http://${baseURL}/api/send/notifications/ambulance/respond`;

      const res = await axios.post(apiUrl, data);

      if (!res) throw new Error();
      console.log(res.data);
      const notificationId = uuid.v4();
      const sentTo = res?.data?.data?.sent_to;

      if (sentTo) {
        const sentToList = sentTo.split(',');
        sentToList.forEach(item => {
          NotificationDb.ref(`Notification/${item}/${notificationId}`)
            .set({
              requestId: `${res?.data?.data?.requestId}`,
              notification: res?.data?.data?.notification,
              data: res?.data?.data,
            })
            .then(() => console.log('Data updated.'))
            .catch(error => console.error('Error updating data:', error));
        });
      }
    } catch (error) {
      console.log('err', error);
      console.log(error?.response?.data);
    }
  }

  const changeStatus = (userId, confirmedRequestId) => {
    NotificationDb.ref(`Notification/${userId}`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const uniqueKey = childSnapshot.key;
          const requestData = childSnapshot.child('data').val(); // Retrieve data object
          if (requestData.requestId === confirmedRequestId) {
            // Check if requestId matches
            const entryRef = NotificationDb.ref(
              `Notification/${userId}/${uniqueKey}/data/status`,
            );
            // Update the status for the current entry
            entryRef
              .set('Closed')
              .then(() => {
                console.log(
                  `Status updated successfully for entry ${uniqueKey}`,
                );
              })
              .catch(error => {
                console.error(
                  `Error updating status for entry ${uniqueKey}: ${error}`,
                );
              });
          }
        });
      });
  };
  const handleRequestAccept = item => {
    postAcceptData(item);
  };

  async function postConfirmData(item) {
    const data = {
      requestId: item?.requestId,
      latitude: `${location?.coords?.latitude}`,
      longitude: `${location?.coords?.longitude}`,
      responder: userName,
      type: 'confirmed',
      status: 'Active',
      disableTracking: false,
      requestInitiator: item?.data?.userName,
      ...(item?.data?.requestType === 'blood' && {
        bloodGroup: item?.data?.bloodGroup,
      }),
    };
    console.log({data});

    try {
      const apiUrl =
        item?.data?.requestType === 'blood'
          ? `http://${baseURL}/api/send/notifications/blood/confirm`
          : `http://${baseURL}/api/send/notifications/ambulance/confirm`;
      const res = await axios.post(apiUrl, data);

      if (!res) throw new Error();
      const notificationId = uuid.v4();
      const sentTo = res?.data?.data?.sent_to;

      if (sentTo) {
        const sentToList = sentTo.split(',');
        sentToList.forEach(item => {
          NotificationDb.ref(`Notification/${item}/${notificationId}`)
            .set({
              requestId: `${res?.data?.data?.requestId}`,
              notification: res?.data?.data?.notification,
              data: res?.data?.data,
            })
            .then(() => console.log('Data updated.'))
            .catch(error => console.error('Error updating data:', error));
        });
      }
      // -----------------
      const confirmedRequestId = item?.data?.requestId;
      const changeStatusFor = res?.data?.data?.users;
      if (changeStatusFor) {
        const changeStatusForList = changeStatusFor.split(',');
        changeStatusForList.forEach(userId => {
          changeStatus(userId, confirmedRequestId);
        });
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  const handleConfirmClick = item => {
    postConfirmData(item);
    const confirmedRequestId = item?.data?.requestId;
    NotificationDb.ref(`Notification/${userName}`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const uniqueKey = childSnapshot.key;
          const newStatus = 'Closed';
          const requestData = childSnapshot.child('data').val(); // Retrieve data object
          if (requestData.requestId === confirmedRequestId) {
            // Check if requestId matches
            const entryRef = NotificationDb.ref(
              `Notification/${userName}/${uniqueKey}/data/status`,
            );
            // Update the status for the current entry
            entryRef
              .set(newStatus)
              .then(() => {
                console.log(
                  `Status updated successfully for entry ${uniqueKey}`,
                );
              })
              .catch(error => {
                console.error(
                  `Error updating status for entry ${uniqueKey}:`,
                  error,
                );
              });
          }
        });
      })
      .catch(error => {
        console.error('Error retrieving data from Firebase:', error);
      });
  };
  const handleFetchLiveLocation = item => {
    let currentStatus = item?.data?.disableTracking;
    LocationFetchUsersDb.ref(`LocationFetchUsers/${item?.data?.userName}`).set(
      !currentStatus,
    );
    handleClick(item);
    // Navigating to map screen after setting required states. Done by handleClick function.
  };
  const updateDisableTrackingStatus = (user, confirmedRequestId) => {
    NotificationDb.ref(`Notification/${user}`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const uniqueKey = childSnapshot.key;
          const requestData = childSnapshot.child('data').val(); // Retrieve data object
          if (requestData.requestId === confirmedRequestId) {
            // Check if requestId matches
            const entryRef = NotificationDb.ref(
              `Notification/${user}/${uniqueKey}/data/disableTracking`,
            );
            // Update the status for the current entry
            entryRef
              .set(true)
              .then(() => {
                console.log(
                  `Status updated successfully for entry ${uniqueKey}`,
                );
              })
              .catch(error => {
                console.error(
                  `Error updating status for entry ${uniqueKey}: ${error}`,
                );
              });
          }
        });
      });
  };
  const handleDisableLocationFetch = item => {
    LocationFetchUsersDb.ref(`LocationFetchUsers/${userName}`).set(null);
    const confirmedRequestId = item?.data?.requestId;
    updateDisableTrackingStatus(item?.data?.userName, confirmedRequestId);
    updateDisableTrackingStatus(userName, confirmedRequestId);
  };

  return {
    content,
    setContent,
    visibleDetail,
    setVisibleDetail,
    handleClick,
    toggleDetails,
    handleRequestAccept,
    handleConfirmClick,
    handleFetchLiveLocation,
    handleDisableLocationFetch,
  };
};

export default useNotificationUtils;
