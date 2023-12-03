import {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, TextInput, Text, RadioButton} from 'react-native-paper';

// import {useState} from 'react';
import axios from 'axios';

function OrgRegistration({navigation}) {
  const baseURL = '192.168.1.71:3000';

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
    console.log('%555555555');
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
      <ScrollView>
        <View>
          <View>
            {/* <Text>Organization Name</Text> */}
            <TextInput
              mode="outlined"
              value={organizationName}
              onChangeText={text => {
                setorgName(text);
              }}
              label="Enter Organization Name"
            />
          </View>

          <View>
            {/* <Text>Type of Organization</Text> */}
            <RadioButton.Group
              onValueChange={value => {
                setOrgType(value);
              }}
              value={orgtype}>
              <RadioButton.Item label="Hospital" value="1" />
              <RadioButton.Item label="Clinic" value="2" />
              <RadioButton.Item label="Ambulance" value="3" />
            </RadioButton.Group>
          </View>

          <View>
            {/* <Text>Email Address</Text> */}
            <TextInput
              value={email}
              mode="outlined"
              onChangeText={text => {
                setEmail(text);
              }}
              label="example@gmail.com"
            />
          </View>
          <View>
            {/* <Text>User Name</Text> */}
            <TextInput
              mode="outlined"
              value={userName}
              onChangeText={text => {
                setUserName(text);
              }}
              label="Set User Name"
            />
          </View>
          <View>
            {/* <Text>Password</Text> */}
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              label="Set Password"
            />
          </View>
          <View>
            {/* <Text>Phone number</Text> */}
            <TextInput
              mode="outlined"
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              label="Set Phone Number"
            />
          </View>
          <View>
            <Text>Bio</Text>
            <TextInput
              mode="outlined"
              value={bio}
              onChangeText={text => {
                setBio(text);
              }}
              label="Description"
            />
          </View>
          <View>
            <Text>Address</Text>
            <TextInput
              value={address}
              mode="outlined"
              onChangeText={text => {
                setAddress(text);
              }}
              label="Enter current Address"
            />
          </View>
          {/* <View>
            <RadioButton.Group
              onValueChange={value => {
                setServices(value);
              }}
              value={bloodGroup}>

             
            </RadioButton.Group>
          </View> */}
          {/* {isError && (
            <View style={styles.error}>
              <Text style={styles.errmsg}>{error}</Text>
            </View>
          )} */}
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
      </ScrollView>
    </View>
  );
}
export default OrgRegistration;
