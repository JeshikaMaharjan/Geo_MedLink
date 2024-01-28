import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, RadioButton, Text} from 'react-native-paper';
import {Mapstyles as styles} from './style/Map';
import {GlobalContext} from '../../context/GlobalStates';

const InteractionModal = ({navigation}) => {
  const [{userName, location}, {setIsInteractionModalVisible}] =
    useContext(GlobalContext);
  const [modalNumber, setModalNumber] = useState(0);
  const [bloodGroup, setBloodGroup] = useState();
  const navigate = navigation.navigate;
  const [isError, setIsError] = useState(false);

  async function postData() {
    setIsError(false);
    const data = {
      bloodGroup: bloodGroup,
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      // userName: userName,
      userName: 'test',
    };
    console.log(data);
    setModalNumber(1);
    // try {
    //   const res = await axios.post(`http://${baseURL}/api/send/notifications/request`, data);

    //   if (!res) throw new Error();
    //   setModalNumber(1);

    // } catch (error) {
    //   console.log(error?.response?.data);

    // }
  }

  const handleBloodDonorClick = () => {
    if (!bloodGroup) {
      setIsError(true);
      return;
    }
    postData();
    // API logic
  };

  const handleAmbulanceClick = () => {
    setModalNumber(1);
  };

  return (
    <View style={styles.modalInnerContainer}>
      {modalNumber === 0 ? (
        <>
          <Text>Select Blood Group</Text>

          <View>
            <RadioButton.Group
              onValueChange={value => {
                setBloodGroup(value);
              }}
              value={bloodGroup}>
              <RadioButton.Item label="A-" value="A-" />
              <RadioButton.Item label="A+" value="A+" />
              <RadioButton.Item label="B-" value="B-" />
              <RadioButton.Item label="B+" value="B+" />
              <RadioButton.Item label="AB-" value="AB-" />
              <RadioButton.Item label="AB+" value="AB+" />
              <RadioButton.Item label="O-" value="O-" />
              <RadioButton.Item label="O+" value="O+" />
            </RadioButton.Group>
          </View>
          {isError && (
            <Text style={{color: 'red'}}>
              Please choose a blood group to continue.
            </Text>
          )}
          <Text>Please choose your desired request</Text>
          <Button mode="elevated" onPress={handleBloodDonorClick}>
            Request Blood Donor
          </Button>
          <Button mode="elevated" onPress={handleAmbulanceClick}>
            Request Ambulance
          </Button>
        </>
      ) : (
        <>
          <Text>Request has been sent to nearby users.</Text>
          <Button
            mode="elevated"
            onPress={() => {
              navigate('Notification');
              setIsInteractionModalVisible(false);
            }}>
            Okay
          </Button>
        </>
      )}
    </View>
  );
};

export default InteractionModal;
