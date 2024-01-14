import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button, Modal, Text} from 'react-native-paper';
import {Mapstyles as styles} from './style/Map';
import {GlobalContext} from '../../context/GlobalStates';

const InteractionModal = () => {
  const [
    {isIncoming, isInteractionModalVisible, incomingRequest},
    {setIsInteractionModalVisible},
  ] = useContext(GlobalContext);
  const [modalNumber, setModalNumber] = useState(0);
  const handleBloodDonorClick = () => {
    setIsInteractionModalVisible(false);
    setModalNumber(1);
  };
  const handleAmbulanceClick = () => {
    setIsInteractionModalVisible(false);
  };
  const handleAcceptClick = () => {};
  console.log(typeof incomingRequest);

  return (
    <>
      {modalNumber === 0 && (
        <Modal
          visible={isInteractionModalVisible}
          onDismiss={() => {
            setIsInteractionModalVisible(false);
          }}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            {!isIncoming ? (
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
                {/* <Text>{incomingRequest}</Text> */}
                <Text>Incoming request</Text>
                {/* <Button onPress={handleAcceptClick}>Accept</Button>
                <Button onPress={handleRejectClick}>Reject</Button> */}
              </>
            )}
          </View>
        </Modal>
      )}
      {modalNumber === 1 && (
        <Modal
          visible={isInteractionModalVisible}
          onDismiss={() => {
            setIsInteractionModalVisible(false);
          }}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <Text>Request has been sent.</Text>
            <Button mode="elevated">Okay</Button>
          </View>
        </Modal>
      )}
    </>
  );
};

export default InteractionModal;
