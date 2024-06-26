import React from 'react';
import {View, Image} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {GlobalContext} from '../../../context/GlobalStates';

function UserRegistration({navigation}) {
  const [
    {baseURL, isModalVisible, location, deviceToken},
    {setModalVisible, setuserName},
  ] = useContext(GlobalContext);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhone] = useState(null);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(null);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState();

  async function postData() {
    setisError(false);
    const data = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      userName: userName,
      password: password,
      type: 1,
      gender: gender,
      address: address,
      email: email,
      phoneNumber: phoneNumber,
      deviceId: deviceToken?._j?.token,
      longitude: location?.coords?.longitude,
      latitude: location?.coords?.latitude,
      image: image,
    };
    console.log({data});
    try {
      const res = await axios.post(`${baseURL}/user`, data);

      if (!res) throw new Error();
      setuserName(userName);
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setPhone('');
      setGender();
      setAddress('');
      setEmail('');
      setImage(null);
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
      setisError(true);
      setError(error?.response?.data?.error.message);
      setModalVisible(true);
    }
    setModalVisible(true);
  }

  function handleSubmit() {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      !gender ||
      !address ||
      !email
    ) {
      setError('Please fill all the required fields!!');
      setisError(true);
      setModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      setisError(true);
      setError('Please match the email format as shown.');
      setModalVisible(true);
      return;
    }
    if (!passwordRegex.test(password)) {
      setisError(true);
      setError(
        'Password must contain one uppercase, one lowercase and min length is 8',
      );
      setModalVisible(true);
      return;
    }
    postData();
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };

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

        <Text variant="bodyLarge">Gender</Text>
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
            <RadioButton.Item label="Others" value="others" />
          </RadioButton.Group>
        </Card>

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
              if (text) {
                setPhone(parseInt(text));
              } else {
                setPhone(null);
              }
            }}
          />
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button mode="elevated" onPress={pickImage}>
            Click to upload profile picture.
          </Button>
          {image && (
            <Image
              source={{uri: `data:image/png;base64,${image}`}}
              style={{width: 200, height: 200}}
            />
          )}
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
              <ModalView navigation={navigation} userName={userName} />
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default UserRegistration;
