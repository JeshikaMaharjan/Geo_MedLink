import React, {useContext, useState} from 'react';
import {View, Image} from 'react-native';
import {Button, RadioButton, Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import {GlobalContext} from '../../context/GlobalStates';
import {UserRegisterstyles} from './UserRegistration/style/UserRegistration';

export default function ModalView({navigation}) {
  const [{baseURL, userName}, {setModalVisible}] = useContext(GlobalContext);
  const [bloodGroup, setBloodGroup] = useState('');
  const [NMC, setNMC] = useState('');
  const [degree, setDegree] = useState('');
  const [ModalNumber, setModalNumber] = useState(0);
  const navigate = navigation.navigate;

  return (
    <View>
      {ModalNumber == 0 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
          <Image
            source={require('../../assets/done.png')}
            style={{width: 70, height: 70}}
          />
          <Text>Registered Successfully.</Text>
          <Button
            mode="elevated"
            onPress={() => {
              setModalNumber(1);
            }}>
            Next
          </Button>
        </View>
      )}
      {ModalNumber == 1 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
          <Text>Do you want to be a Donor?</Text>

          <Button
            mode="elevated"
            onPress={() => {
              setModalNumber(2);
            }}>
            Yes
          </Button>

          <Button
            mode="elevated"
            onPress={() => {
              setModalNumber(3);
            }}>
            Skip
          </Button>
        </View>
      )}

      {ModalNumber == 2 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
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
          <Button
            mode="elevated"
            onPress={() => {
              axios
                .put(`${baseURL}/donor/activate/${userName}`, {
                  blood_Group: bloodGroup,
                })
                .then(res => {
                  console.log(res.data);
                })
                .catch(err => {
                  console.log(err?.response?.data);
                });

              setModalNumber(3);
            }}>
            Submit Blood Group
          </Button>
        </View>
      )}

      {ModalNumber == 3 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
          <Text>Do you want to register as Doctor?</Text>

          <Button
            mode="elevated"
            onPress={() => {
              setModalNumber(4);
            }}>
            Yes
          </Button>

          <Button
            mode="elevated"
            onPress={() => {
              setModalNumber(5);
            }}>
            Skip
          </Button>
        </View>
      )}

      {ModalNumber == 4 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
          <Text>Enter valid NMC Number</Text>
          <TextInput
            mode="outlined"
            value={NMC}
            style={{width: 150}}
            onChangeText={text => {
              setNMC(text);
            }}
          />
          <Text>Enter Degree</Text>
          <TextInput
            mode="outlined"
            style={{width: 150}}
            value={degree}
            onChangeText={text => {
              setDegree(text);
            }}
          />

          <Button
            mode="elevated"
            onPress={() => {
              axios
                .post(`${baseURL}/register/doctor`, {
                  userName: userName,
                  degree: degree,
                  NMC: parseInt(NMC),
                })
                .then(res => {
                  console.log(res.data);
                })
                .catch(err => {
                  console.log(err?.response?.data);
                });
              setModalNumber(5);
            }}>
            Done
          </Button>
        </View>
      )}
      {ModalNumber == 5 && (
        <View style={UserRegisterstyles.modalInnerContainer}>
          <Image
            source={require('../../assets/done.png')}
            style={{width: 70, height: 70}}
          />
          <Text>Registered Successfully.</Text>
          <Button
            mode="elevated"
            onPress={() => {
              navigate('Registration');
              setModalVisible(false);
            }}>
            Okay
          </Button>
        </View>
      )}
    </View>
  );
}
