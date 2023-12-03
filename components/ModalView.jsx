import {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Button, RadioButton, Text} from 'react-native-paper';
import axios from 'axios';

export default function ModalView() {
  const baseURL = '192.168.1.71:3000';

  const [bloodGroup, setBloodGroup] = useState('');
  const [NMC, setNMC] = useState('');
  const [degree, setDegree] = useState('');
  const [checked, setChecked] = useState('');
  const [ModalNumber, setModalNumber] = useState(0);
  return (
    <View>
      {ModalNumber == 0 && (
        <View>
          <Text>Registered Successfully.</Text>
          <Text
            onPress={() => {
              setModalNumber(1);
            }}>
            Next
          </Text>
        </View>
      )}
      {ModalNumber == 1 && (
        <View>
          <Text>Do you want to be a Donor?</Text>

          <Text
            onPress={() => {
              setModalNumber(2);
            }}>
            Yes
          </Text>

          <Text
            onPress={() => {
              setModalNumber(3);
            }}>
            Skip
          </Text>
        </View>
      )}

      {ModalNumber == 2 && (
        <View>
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
            onPress={() => {
              axios
                // .put(`http://${baseURL}/api/donor/activate/${userName}`, {
                .put(`http://${baseURL}/api/donor/activate/Jjjjjgff`, {
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
        <View>
          <Text>Do you want to register as Doctor?</Text>

          <Text
            onPress={() => {
              setModalNumber(4);
            }}>
            Yes
          </Text>

          <Text
            onPress={() => {
              setModalNumber(0);
              setModalVisible(false);
              navigation.navigate('Registration');
            }}>
            Skip
          </Text>
        </View>
      )}

      {ModalNumber == 4 && (
        <View>
          <Text>Enter valid NMC Number</Text>
          <TextInput
            mode="outlined"
            value={NMC}
            onChangeText={text => {
              setNMC(text);
            }}
            label="NMC number"
          />
          <Text>Enter Degree</Text>
          <TextInput
            mode="outlined"
            value={degree}
            onChangeText={text => {
              setDegree(text);
            }}
            label="Degree"
          />

          <Text
            onPress={() => {
              axios
                .post(`http://${baseURL}/api/register/doctor`, {
                  userName: 'Jcka1',
                  degree: degree,
                  NMC: parseInt(NMC),
                })
                .then(res => {
                  console.log(res.data);
                })
                .catch(err => {
                  console.log(err?.response?.data);
                });
              setModalNumber(0);
              //   navigation.navigate('Registration');
            }}>
            Done
          </Text>
        </View>
      )}
    </View>
  );
}
