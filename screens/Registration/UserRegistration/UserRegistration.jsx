import {View, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
import {useContext, useState} from 'react';
import {
  Button,
  TextInput,
  Text,
  Modal,
  Portal,
  RadioButton,
  Card,
  HelperText,
} from 'react-native-paper';
import {UserRegisterstyles} from './style/UserRegistration';
import ModalView from '../ModalView';
import axios from 'axios';
import {GlobalContext} from '../../../context/GlobalStates';
import {getToken} from '../../../utils';

function UserRegistration({navigation}) {
  const [{baseURL, isModalVisible}, {setModalVisible}] =
    useContext(GlobalContext);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  // const [isModalVisible, setModalVisible] = useState(true);
  const [deviceToken, setDeviceToken] = useState();
  const [isError, setisError] = useState(false);
  const [error, setError] = useState();

  async function postData() {
    console.log(deviceToken);
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
    const mobileToken = getToken();
    setDeviceToken(mobileToken);

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
      <View style={UserRegisterstyles.container}>
        <View>
          <TextInput
            dense="true"
            mode="outlined"
            label="Firstname*"
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
            }}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Middlename"
            value={middleName}
            onChangeText={text => {
              setMiddleName(text);
            }}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Lastname*"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
            }}
          />
        </View>

        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Username*"
            value={userName}
            onChangeText={text => {
              setUserName(text);
            }}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Email Address*"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="example@gmail.com"
          />
          <HelperText type="info" visible={true}>
            Please match the email format as shown. Enter valid email.
          </HelperText>
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Password*"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            placeholder="Set your password"
          />
          <HelperText type="info" visible={true}>
            Password must contain one uppercase, one lowercase and min length is
            8.
          </HelperText>
        </View>

        {/* <Text variant="bodyLarge">Gender</Text>
        <Card
          mode="outlined"
          style={{
            backgroundColor: 'white',
          }}>
          <RadioButton.Group
            onValueChange={value => {
              setGender(value);
            }}
            value={gender}>
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </RadioButton.Group>
        </Card> */}

        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Current Address*"
            value={address}
            onChangeText={text => {
              setAddress(text);
            }}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            label="Current Phone Number"
            value={phoneNumber}
            onChangeText={text => {
              setPhone(text);
            }}
          />
        </View>

        <Button
          mode="elevated"
          style={{width: 200, alignSelf: 'center'}}
          onPress={handleSubmit}>
          Submit
        </Button>
      </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => {
            setModalVisible(false);
          }}
          contentContainerStyle={UserRegisterstyles.modalContainer}>
          <View>
            {isError ? (
              <View style={UserRegisterstyles.modalInnerContainer}>
                <Image
                  source={require('../../../assets/warning.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{color: 'red'}}>{error}</Text>
                <Button mode="elevated" onPress={() => setModalVisible(false)}>
                  Okay
                </Button>
              </View>
            ) : (
              <ModalView navigation={navigation} />
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default UserRegistration;
