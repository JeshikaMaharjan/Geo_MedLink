import {useContext, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  RadioButton,
  Divider,
  Card,
} from 'react-native-paper';
import {OrgRegisterstyles} from '../styles/OrgRegistration';

import axios from 'axios';
import {GlobalContext} from '../context/GlobalStates';

function OrgRegistration({navigation}) {
  const [{baseURL}] = useContext(GlobalContext);
  const [organizationName, setorgName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orgtype, setOrgType] = useState();
  const [services, setServices] = useState([]);

  const [error, setError] = useState('');
  const [isError, setisError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  async function postData() {
    // setisError(false);
    const data = {
      name: organizationName,
      organizationType: parseInt(orgtype),
      address: address,
      email: email,
      type: 2,
      services: [1, 2],
      phoneNumber: parseInt(phoneNumber),
      userName: userName,
      password: password,
      bio: bio,
    };
    console.log('d', data);
    try {
      console.log('try');
      const res = await axios.post(`http://${baseURL}/api/user`, data);
      console.log('eeeeeeee');
      console.log(res.data);
      // if (!res) throw new Error('error msg');
      // setAddress('');
      // setEmail('');
      // setType('');
      // setorgName('');
      // setUserName('');
      // setPassword('');
      // setBio('');
      // setPhoneNumber('');
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
      // console.log(error);
    }
    setModalVisible(true);
  }
  function handleSubmit() {
    // if (
    //   !organizationName ||
    //   !userName ||
    //   !password ||
    //   !services ||
    //   !address ||
    //   !email ||
    //   !phoneNumber ||
    //   !orgtype
    // ) {
    //   setError('Please fill all the required fields!!');
    //   setisError(true);
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // if (!emailRegex.test(email)) {
    //   setisError(true);
    //   setError('Please match the email format as shown.');
    //   // console.log(isError);
    //   return;
    // }
    // if (!passwordRegex.test(password)) {
    //   setisError(true);
    //   setError(
    //     'Password must contain one uppercase, one lowercase and min length is 8',
    //   );
    //   console.log(isError);
    //   return;
    // }
    postData();
  }

  return (
    <View>
      <View style={OrgRegisterstyles.container}>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={organizationName}
            onChangeText={text => {
              setorgName(text);
            }}
            label="Organization Name"
          />
        </View>

        <View>
          <TextInput
            value={email}
            mode="outlined"
            dense="true"
            onChangeText={text => {
              setEmail(text);
            }}
            label="Email Address"
            placeholder="example@gmail.com"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={userName}
            onChangeText={text => {
              setUserName(text);
            }}
            label="User Name"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            label="Password"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
            }}
            label="Current Phone Number"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            dense="true"
            multiline={true}
            value={bio}
            onChangeText={text => {
              setBio(text);
            }}
            label="Description"
            placeholder="Write about yourself"
          />
        </View>
        <View>
          <TextInput
            value={address}
            mode="outlined"
            dense="true"
            onChangeText={text => {
              setAddress(text);
            }}
            label="Current Address"
          />
        </View>
        <Text variant="bodyLarge">Type of Organization</Text>
        <Card
          mode="outlined"
          style={{
            backgroundColor: 'white',
          }}>
          <RadioButton.Group
            onValueChange={value => {
              setOrgType(value);
            }}
            value={orgtype}>
            <RadioButton.Item label="Hospital" value="1" />
            <RadioButton.Item label="Clinic" value="2" />
            <RadioButton.Item label="Ambulance" value="3" />
          </RadioButton.Group>
        </Card>
        {/* {isError && (
            <View style={styles.error}>
              <Text style={styles.errmsg}>{error}</Text>
            </View>
          )} */}
        <Button
          mode="elevated"
          style={{width: 200, alignSelf: 'center'}}
          onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
}
export default OrgRegistration;
