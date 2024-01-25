import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Mapstyles as styles} from './style/Map';
import {GlobalContext} from '../../context/GlobalStates';

const InteractionModal = ({navigation}) => {
  const [, {setIsInteractionModalVisible}] = useContext(GlobalContext);
  const [modalNumber, setModalNumber] = useState(0);
  const navigate = navigation.navigate;

  const handleBloodDonorClick = () => {
    setModalNumber(1);
    // API logic
  };

  const handleAmbulanceClick = () => {
    setModalNumber(1);
  };

  return (
    <View style={styles.modalInnerContainer}>
      {modalNumber === 0 ? (
        <>
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
