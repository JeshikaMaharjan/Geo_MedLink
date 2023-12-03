import {View, ScrollView} from 'react-native';
import {useState} from 'react';
import {
  Button,
  TextInput,
  Text,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {UserRegisterstyles} from '../styles/UserRegistration';
import ModalView from './ModalView';
import axios from 'axios';

function UserRegistration({navigation}) {
  const baseURL = '192.168.1.71:3000';
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhone] = useState(null);
  // const [gender, setGender] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState();

  async function postData() {
    console.log('((99999999');
    setisError(false);
    const data = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      userName: userName,
      password: password,
      type: 1,
      // gender: gender,
      address: address,
      email: email,
      phoneNumber: parseInt(phoneNumber),
    };
    console.log('d', data);
    try {
      const res = await axios.post(`http://${baseURL}/api/user`, data);
      console.log('$$$$$$$$$$$$$');
      console.log(res.data);

      if (!res) throw new Error('error msg');
      // setFirstName('');
      // setMiddleName('');
      // setLastName('');
      // setUserName('');
      // setPassword('');
      // setPhone('');
      // // setGender();

      // setAddress('');
      // setEmail('');
    } catch (error) {
      console.log('error');
      console.log(error.message);
      // console.log({error});
    }
    setModalVisible(true);
  }

  function handleSubmit() {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      // !gender ||
      !address ||
      !email
    ) {
      setError('Please fill all the required fields!!');
      setisError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      setisError(true);
      setError('Please match the email format as shown.');
      console.log(isError);
      return;
    }
    if (!passwordRegex.test(password)) {
      setisError(true);
      setError(
        'Password must contain one uppercase, one lowercase and min length is 8',
      );
      console.log(isError);
      return;
    }
    console.log('$$$$$44');
    postData();
  }

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View>
            {/* <Text>First Name</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Firstname"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
              }}
            />
          </View>
          <View>
            {/* <Text>Middle Name</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Middlename"
              value={middleName}
              onChangeText={text => {
                setMiddleName(text);
              }}
            />
          </View>
          <View>
            {/* <Text>Last Name</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Lastname"
              value={lastName}
              onChangeText={text => {
                setLastName(text);
              }}
            />
          </View>

          <View>
            {/* <Text>User Name</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Username"
              value={userName}
              onChangeText={text => {
                setUserName(text);
              }}
            />
          </View>
          <View>
            {/* <Text>Password</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
            />
          </View>
          {/* <View>
            <Text>Gender</Text>
            <RadioButton.Group
              onValueChange={value => {
                setGender(value);
              }}
              value={gender}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
            </RadioButton.Group>
            {console.log(gender)}
          </View> */}

          <View>
            {/* <Text>Email Address</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Email Address"
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
          <View>
            {/* <Text>Address</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Current Address"
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>
          <View>
            {/* <Text>Phone Number</Text> */}
            <TextInput
              mode="outlined"
              label="Enter Current Phone Number"
              value={phoneNumber}
              onChangeText={text => {
                setPhone(text);
              }}
            />
          </View>

          {/* {isError && (
            <View style={styles.error}>
              <Text style={styles.errmsg}>{error}</Text>
            </View>
          )} */}
          <Button mode="elevated" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => {
            setModalVisible(false);
          }}
          contentContainerStyle={UserRegisterstyles.modalContainer}>
          <View>
            {isError ? (
              <View>
                <Text>{error}</Text>
                <Text onPress={() => setModalVisible(false)}>Okay</Text>
              </View>
            ) : (
              <ModalView />
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default UserRegistration;
