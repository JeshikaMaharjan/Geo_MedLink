import {useContext, useState} from 'react';
import {GlobalContext} from '../../../context/GlobalStates';

const useNotificationUtils = ({navigation}) => {
  const [{NotificationDb, userName}, {setMapView, setLocation}] =
    useContext(GlobalContext);
  const [content, setContent] = useState([]);
  const navigate = navigation.navigate;
  const [visibleDetail, setVisibleDetail] = useState([]);
  const handleClick = item => {
    setMapView('default');
    setLocation({
      coords: {
        latitude: item?.data?.latitude,
        longitude: item?.data?.longitude,
      },
    });
    navigate('Map');
  };

  const toggleDetails = index => {
    setVisibleDetail(prevVisibleDetail => {
      const newVisibleDetail = [...prevVisibleDetail];
      newVisibleDetail[index] = !newVisibleDetail[index];
      return newVisibleDetail;
    });
  };

  const handleConfirmClick = item => {
    console.log(item);
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
  return {
    content,
    setContent,
    visibleDetail,
    setVisibleDetail,
    handleClick,
    toggleDetails,
    handleConfirmClick,
  };
};

export default useNotificationUtils;
